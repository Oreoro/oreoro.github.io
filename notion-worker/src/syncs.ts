import { Worker } from "@notionhq/workers";
import * as Builder from "@notionhq/workers/builder";
import * as Schema from "@notionhq/workers/schema";
import { FOCUSLAB_DATA_SOURCE_ID, PROPS, SITE_URL, slugify } from "./constants.js";

/** Fallback targets when the CMS cannot be read (e.g. no NOTION_API_TOKEN). */
const FALLBACK_TARGETS: Array<{ name: string; url: string }> = [
	{ name: "Focus Lab", url: "https://focuslab.pk" },
	{ name: "Urbanevents.pk", url: "https://urbanevents.pk" },
	{ name: "Muxo.ai", url: "https://muxo.ai" },
	{ name: "Warp N Woof", url: "https://warp-n-woof.com" },
];

interface Target {
	name: string;
	url: string;
}

async function resolveTargets(notion: any): Promise<Target[]> {
	const targets: Target[] = [];
	const seen = new Set<string>();
	const add = (target: Target) => {
		const key = target.url.replace(/\/+$/, "");
		if (!target.url || seen.has(key)) return;
		seen.add(key);
		targets.push(target);
	};

	add({ name: "Focus Lab", url: SITE_URL });

	try {
		const response = await notion.dataSources.query({
			data_source_id: FOCUSLAB_DATA_SOURCE_ID,
			page_size: 100,
			filter: { property: PROPS.type, select: { equals: "Product" } },
		});
		for (const page of response.results ?? []) {
			const props = page.properties ?? {};
			const link = props[PROPS.url]?.url;
			const name = (props[PROPS.title]?.title ?? [])
				.map((item: { plain_text?: string }) => item.plain_text ?? "")
				.join("")
				.trim();
			if (link) add({ name: name || link, url: link });
		}
	} catch {
		// Fall back to the static list below.
	}

	if (targets.length <= 1) {
		for (const target of FALLBACK_TARGETS) add(target);
	}
	return targets;
}

function pick(html: string, pattern: RegExp): string {
	const match = html.match(pattern);
	return match?.[1]?.replace(/\s+/g, " ").trim() ?? "";
}

async function checkSite(
	target: Target,
	pacer: { wait: () => Promise<void> },
): Promise<Record<string, any>> {
	const started = Date.now();
	let status = "Up";
	let httpStatus = 0;
	let pageTitle = "";
	let description = "";
	let notes = "";
	try {
		await pacer.wait();
		const response = await fetch(target.url, {
			redirect: "follow",
			headers: { "user-agent": "focuslab-site-monitor/1.0" },
			signal: AbortSignal.timeout(10_000),
		});
		httpStatus = response.status;
		const finalUrl = response.url;
		if (finalUrl && new URL(finalUrl).host !== new URL(target.url).host) {
			status = "Redirected";
			notes = `Redirects to ${finalUrl}`;
		}
		if (!response.ok) status = "Down";
		const html = await response.text();
		pageTitle = pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
		description = pick(
			html,
			/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
		);
	} catch (error) {
		status = "Error";
		notes = (error as Error).message;
	}
	return {
		name: target.name,
		url: target.url,
		status,
		httpStatus,
		pageTitle,
		description,
		responseMs: Date.now() - started,
		notes,
	};
}

export function registerSyncs(worker: Worker) {
	const siteMonitor = worker.database("siteMonitor", {
		type: "managed",
		initialTitle: "Focus Lab Site Monitor",
		primaryKeyProperty: "Site ID",
		schema: {
			properties: {
				Site: Schema.title(),
				"Site ID": Schema.richText(),
				URL: Schema.url(),
				Status: Schema.select([
					{ name: "Up", color: "green" },
					{ name: "Redirected", color: "yellow" },
					{ name: "Down", color: "red" },
					{ name: "Error", color: "gray" },
				]),
				"HTTP Status": Schema.number(),
				"Page Title": Schema.richText(),
				Description: Schema.richText(),
				"Response Time (ms)": Schema.number(),
				"Checked At": Schema.date(),
				Notes: Schema.richText(),
			},
		},
	});

	const sites = worker.pacer("sites", { allowedRequests: 2, intervalMs: 1000 });

	worker.sync("siteMonitorSync", {
		database: siteMonitor,
		mode: "replace",
		schedule: "1h",
		execute: async (_state, { notion }) => {
			const targets = await resolveTargets(notion);
			const changes = [];
			for (const target of targets) {
				const result = await checkSite(target, sites);
				changes.push({
					type: "upsert" as const,
					key: slugify(result.name) || slugify(result.url),
					properties: {
						Site: Builder.title(result.name),
						"Site ID": Builder.richText(slugify(result.name) || slugify(result.url)),
						URL: Builder.url(result.url),
						Status: Builder.select(result.status),
						"HTTP Status": Builder.number(result.httpStatus),
						"Page Title": Builder.richText(result.pageTitle),
						Description: Builder.richText(result.description),
						"Response Time (ms)": Builder.number(result.responseMs),
						"Checked At": Builder.date(new Date().toISOString().slice(0, 10)),
						Notes: Builder.richText(result.notes),
					},
				});
			}
			return { changes, hasMore: false };
		},
	});
}