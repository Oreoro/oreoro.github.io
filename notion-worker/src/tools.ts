import { Worker } from "@notionhq/workers";
import { j } from "@notionhq/workers/schema-builder";
import {
	CONTENT_TYPES,
	FOCUSLAB_DATA_SOURCE_ID,
	PROPS,
	contentUrl,
	slugify,
} from "./constants.js";
import {
	assertType,
	buildProperties,
	findBySlug,
	pageToEntry,
	queryEntries,
	type ContentEntry,
	type ContentInput,
} from "./cms.js";
import { triggerDeploy } from "./deploy.js";

/** Compact shape returned to agents so they do not have to re-read pages. */
function summarize(entry: ContentEntry) {
	return {
		name: entry.name,
		slug: entry.slug,
		type: entry.type,
		published: entry.published,
		date: entry.date,
		summary: entry.summary,
		tags: entry.tags,
		order: entry.order,
		featured: entry.featured,
		link: entry.link,
		url: entry.url,
		id: entry.id,
	};
}

async function replaceBody(notion: any, pageId: string, markdown: string) {
	await notion.pages.updateMarkdown({
		page_id: pageId,
		type: "replace_content",
		replace_content: { new_str: markdown },
	});
}

export function registerTools(worker: Worker) {
	worker.tool("listContent", {
		title: "List Focus Lab content",
		description:
			"List entries in the Focus Lab CMS. Use this first to check what already exists, find slugs, and confirm publish state before creating or editing content.",
		schema: j.object({
			type: j.enum(...CONTENT_TYPES).describe("Filter by content type.").nullable(),
			published: j.boolean().describe("Filter by published state. Omit for all.").nullable(),
			tag: j.string().describe("Filter by a single tag.").nullable(),
			limit: j.number().describe("Maximum entries to return (default 50).").nullable(),
		}),
		hints: { readOnlyHint: true },
		execute: async ({ type, published, tag, limit }, { notion }) => {
			const entries = await queryEntries(notion, {
				type: type ?? undefined,
				published: published ?? undefined,
				tag: tag ?? undefined,
				limit: limit ?? 50,
			});
			return { count: entries.length, entries: entries.map(summarize) };
		},
	});

	worker.tool("getContent", {
		title: "Get Focus Lab content entry",
		description:
			"Read one Focus Lab CMS entry by slug, including its Markdown body. Use this when you need the full text of a page, article, or product.",
		schema: j.object({
			slug: j.string().describe("The entry slug, e.g. \"shipping-ai-products\"."),
			includeBody: j.boolean().describe("Include the Markdown body (default true).").nullable(),
		}),
		hints: { readOnlyHint: true },
		execute: async ({ slug, includeBody }, { notion }): Promise<any> => {
			const page = await findBySlug(notion, slug);
			if (!page) return { found: false, slug, message: `No entry with slug "${slug}".` };
			const entry = pageToEntry(page);
			let body: string | null = null;
			if (includeBody !== false) {
				try {
					const md = await notion.pages.retrieveMarkdown({ page_id: page.id });
					body = md.markdown ?? null;
				} catch (error) {
					body = `[body unavailable: ${(error as Error).message}]`;
				}
			}
			return { found: true, entry: summarize(entry), body };
		},
	});

	worker.tool("auditContent", {
		title: "Audit Focus Lab content",
		description:
			"Run a content QA pass over the Focus Lab CMS. Use this to find missing slugs, missing summaries, unpublished drafts, and duplicate slugs before a release.",
		schema: j.object({}),
		hints: { readOnlyHint: true },
		execute: async (_input, { notion }) => {
			const entries = await queryEntries(notion, { limit: 100 });
			const bySlug = new Map<string, number>();
			for (const entry of entries) {
				if (!entry.slug) continue;
				bySlug.set(entry.slug, (bySlug.get(entry.slug) ?? 0) + 1);
			}
			return {
				total: entries.length,
				byType: CONTENT_TYPES.map((type) => ({
					type,
					count: entries.filter((entry) => entry.type === type).length,
				})),
				unpublished: entries.filter((entry) => !entry.published).map((entry) => entry.slug),
				missingSlug: entries.filter((entry) => !entry.slug).map((entry) => entry.name),
				missingSummary: entries.filter((entry) => !entry.summary).map((entry) => entry.slug),
				duplicateSlugs: [...bySlug.entries()].filter(([, count]) => count > 1).map(([slug]) => slug),
			};
		},
	});

	worker.tool("createContent", {
		title: "Create Focus Lab content",
		description:
			"Create a new entry in the Focus Lab CMS. Always pass a type and a clear name; set published true only when the content is ready for the live site. The slug is generated from the name when omitted.",
		schema: j.object({
			name: j.string().describe("Title shown on the site."),
			type: j.enum(...CONTENT_TYPES).describe("Page, Product, Article, or Update."),
			slug: j.string().describe("URL slug. Auto-generated from name when omitted.").nullable(),
			summary: j.string().describe("One or two sentence summary used in cards and meta tags.").nullable(),
			tags: j.array(j.string()).describe("Tags such as AI, SaaS, Framer.").nullable(),
			link: j.string().describe("External URL for products or links.").nullable(),
			date: j.string().describe("ISO date (YYYY-MM-DD). Defaults to today.").nullable(),
			order: j.number().describe("Manual sort order.").nullable(),
			featured: j.boolean().describe("Mark as featured.").nullable(),
			published: j.boolean().describe("Publish to the live site (default false).").nullable(),
			body: j.string().describe("Markdown body content.").nullable(),
		}),
		execute: async (input, { notion }): Promise<any> => {
			const name = input.name.trim();
			const slug = slugify(input.slug || name);
			const existing = await findBySlug(notion, slug);
			if (existing) {
				return {
					created: false,
					reason: "slug_exists",
					slug,
					message: `An entry with slug "${slug}" already exists. Use updateContent instead.`,
				};
			}

			const properties = buildProperties({
				name,
				type: assertType(input.type),
				slug,
				summary: input.summary ?? undefined,
				tags: input.tags ?? undefined,
				link: input.link ?? undefined,
				date: input.date ?? (input.published ? new Date().toISOString().slice(0, 10) : undefined),
				order: input.order ?? undefined,
				featured: input.featured ?? undefined,
				published: input.published ?? false,
			} as ContentInput);

			const page = await notion.pages.create({
				parent: { type: "data_source_id", data_source_id: FOCUSLAB_DATA_SOURCE_ID },
				properties,
			} as any);

			if (input.body) await replaceBody(notion, page.id, input.body);

			return {
				created: true,
				slug,
				url: contentUrl(slug),
				pageId: page.id,
				message: input.published
					? "Created and published. Call deploySite to rebuild the site."
					: "Created as a draft.",
			};
		},
	});

	worker.tool("updateContent", {
		title: "Update Focus Lab content",
		description:
			"Update an existing Focus Lab CMS entry by slug. Only the fields you pass are changed. Pass body to replace the page content with Markdown.",
		schema: j.object({
			slug: j.string().describe("Slug of the entry to update."),
			name: j.string().describe("New title.").nullable(),
			summary: j.string().describe("New summary.").nullable(),
			tags: j.array(j.string()).describe("Replace the tag list.").nullable(),
			link: j.string().describe("Replace the external link.").nullable(),
			date: j.string().describe("New ISO date (YYYY-MM-DD).").nullable(),
			order: j.number().describe("New sort order.").nullable(),
			featured: j.boolean().describe("Set featured flag.").nullable(),
			body: j.string().describe("Replace the page body with this Markdown.").nullable(),
		}),
		execute: async (input, { notion }): Promise<any> => {
			const page = await findBySlug(notion, input.slug);
			if (!page) {
				return { updated: false, reason: "not_found", message: `No entry with slug "${input.slug}".` };
			}

			const properties = buildProperties(
				{
					name: input.name ?? undefined,
					summary: input.summary ?? undefined,
					tags: input.tags ?? undefined,
					link: input.link ?? undefined,
					date: input.date ?? undefined,
					order: input.order ?? undefined,
					featured: input.featured ?? undefined,
				} as ContentInput,
				{ partial: true },
			);

			if (Object.keys(properties).length > 0) {
				await notion.pages.update({ page_id: page.id, properties } as any);
			}
			if (input.body) await replaceBody(notion, page.id, input.body);

			return { updated: true, slug: input.slug, url: contentUrl(input.slug) };
		},
	});

	worker.tool("setPublished", {
		title: "Publish or unpublish content",
		description:
			"Publish or unpublish a Focus Lab CMS entry by slug. Publishing stamps today's date when no date is set. After publishing, call deploySite so the change reaches the live site.",
		schema: j.object({
			slug: j.string().describe("Slug of the entry."),
			published: j.boolean().describe("true to publish, false to unpublish."),
			date: j.string().describe("Override the publish date (YYYY-MM-DD).").nullable(),
		}),
		execute: async ({ slug, published, date }, { notion }): Promise<any> => {
			const page = await findBySlug(notion, slug);
			if (!page) return { updated: false, reason: "not_found", message: `No entry with slug "${slug}".` };

			const properties: Record<string, any> = {
				[PROPS.published]: { checkbox: published },
			};
			if (published && (date || !pageToEntry(page).date)) {
				properties[PROPS.date] = { date: { start: date ?? new Date().toISOString().slice(0, 10) } };
			}
			await notion.pages.update({ page_id: page.id, properties } as any);

			let deploy: Awaited<ReturnType<typeof triggerDeploy>> | null = null;
			if (published && process.env.AUTO_DEPLOY_ON_PUBLISH === "true") {
				deploy = await triggerDeploy(`Published ${slug}`);
			}

			return {
				updated: true,
				slug,
				published,
				url: contentUrl(slug),
				deploy,
				message: published
					? deploy
						? "Published and rebuild triggered."
						: "Published. Call deploySite to rebuild the site."
					: "Unpublished.",
			};
		},
	});

	worker.tool("archiveContent", {
		title: "Archive Focus Lab content",
		description:
			"Archive (move to trash) a Focus Lab CMS entry by slug. Use this instead of deleting when content is retired. Call deploySite afterwards.",
		schema: j.object({
			slug: j.string().describe("Slug of the entry to archive."),
		}),
		execute: async ({ slug }, { notion }): Promise<any> => {
			const page = await findBySlug(notion, slug);
			if (!page) return { archived: false, reason: "not_found", message: `No entry with slug "${slug}".` };
			await notion.pages.update({ page_id: page.id, archived: true } as any);
			return { archived: true, slug, message: "Archived. Call deploySite to rebuild the site." };
		},
	});

	worker.tool("deploySite", {
		title: "Rebuild focuslab.pk",
		description:
			"Trigger a new build of the focuslab.pk site so published Notion content goes live. Use after publishing, updating, or archiving content.",
		schema: j.object({
			reason: j.string().describe("Short reason for the rebuild.").nullable(),
		}),
		execute: async ({ reason }): Promise<any> => triggerDeploy(reason ?? undefined),
	});

	worker.tool("focuslabPlaybook", {
		title: "Focus Lab content playbook",
		description:
			"Return the canonical Focus Lab content workflow and rules. Call this once at the start of any content task so you follow the studio conventions instead of guessing.",
		schema: j.object({}),
		hints: { readOnlyHint: true },
		execute: () => ({
			cms: "Focus Lab CMS (data source " + FOCUSLAB_DATA_SOURCE_ID + ")",
			types: {
				Page: "Static marketing pages: home, services, work, contact.",
				Product: "A product or client engagement. Always set Link when there is a live site.",
				Article: "Long-form blog post.",
				Update: "Short changelog-style note.",
			},
			tags: ["AI", "SaaS", "Mobile", "Ecommerce", "Framer", "Shopify", "Design", "Engineering"],
			slugRules: "Lowercase, hyphenated, derived from the title. Set it once and keep it stable — URLs depend on it.",
			workflow: [
				"1. Call listContent to see existing entries and avoid duplicate slugs.",
				"2. Use createContent for new entries (published defaults to false).",
				"3. Use updateContent to change fields or replace the Markdown body.",
				"4. Use setPublished when the content is ready for the live site.",
				"5. Call deploySite so the rebuilt site picks up the change.",
			],
			writingRules: [
				"Lead with what the reader gets, not with company history.",
				"Keep summaries to one or two sentences; they power cards and meta tags.",
				"Prefer concrete outcomes and product names (Urbanevents.pk, Muxo.ai, Dez, warp-n-woof.com).",
				"Use Markdown for bodies: # / ## headings, paragraphs, and - bullets.",
			],
			publishingRules: [
				"Never publish unfinished drafts.",
				"Publishing stamps today's date if the entry has none.",
				"Always call deploySite after publish/unpublish/archive.",
			],
		}),
	});
}