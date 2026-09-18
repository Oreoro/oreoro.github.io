import type { Client } from "@notionhq/client";
import {
	CONTENT_TYPES,
	FOCUSLAB_DATA_SOURCE_ID,
	PROPS,
	contentUrl,
	type ContentType,
} from "./constants.js";

type RichText = { plain_text?: string };
type NotionPage = {
	id: string;
	object?: string;
	url?: string;
	properties: Record<string, any>;
	icon?: any;
	cover?: any;
};

export interface ContentInput {
	name?: string;
	type?: ContentType;
	slug?: string;
	summary?: string;
	tags?: string[];
	link?: string;
	date?: string;
	order?: number;
	featured?: boolean;
	published?: boolean;
}

export interface ContentEntry {
	id: string;
	name: string;
	slug: string;
	type: string;
	summary: string;
	tags: string[];
	date: string | null;
	published: boolean;
	order: number | null;
	featured: boolean;
	link: string | null;
	url: string;
}

function plain(rich: RichText[] | undefined): string {
	if (!Array.isArray(rich)) return "";
	return rich.map((item) => item?.plain_text ?? "").join("").trim();
}

function richText(content: string): Array<{ type: "text"; text: { content: string } }> {
	return [{ type: "text", text: { content } }];
}

export function pageToEntry(page: NotionPage): ContentEntry {
	const p = page.properties ?? {};
	const name = plain(p[PROPS.title]?.title);
	const slug = plain(p[PROPS.slug]?.rich_text);
	const tags: string[] = Array.isArray(p[PROPS.tags]?.multi_select)
		? p[PROPS.tags].multi_select.map((option: { name: string }) => option.name)
		: [];
	return {
		id: page.id,
		name,
		slug,
		type: p[PROPS.type]?.select?.name ?? "",
		summary: plain(p[PROPS.summary]?.rich_text),
		tags,
		date: p[PROPS.date]?.date?.start ?? null,
		published: Boolean(p[PROPS.published]?.checkbox),
		order: typeof p[PROPS.order]?.number === "number" ? p[PROPS.order].number : null,
		featured: Boolean(p[PROPS.featured]?.checkbox),
		link: p[PROPS.url]?.url ?? null,
		url: contentUrl(slug),
	};
}

export async function queryEntries(
	notion: Client,
	options: { type?: ContentType; published?: boolean; tag?: string; limit?: number } = {},
): Promise<ContentEntry[]> {
	const filters: any[] = [];
	if (options.type) filters.push({ property: PROPS.type, select: { equals: options.type } });
	if (options.published !== undefined) {
		filters.push({ property: PROPS.published, checkbox: { equals: options.published } });
	}
	if (options.tag) {
		filters.push({ property: PROPS.tags, multi_select: { contains: options.tag } });
	}

	const response = await notion.dataSources.query({
		data_source_id: FOCUSLAB_DATA_SOURCE_ID,
		page_size: Math.min(options.limit ?? 100, 100),
		sorts: [{ property: PROPS.order, direction: "ascending" }],
		...(filters.length ? { filter: { and: filters } } : {}),
	} as any);

	return (response.results as unknown as NotionPage[])
		.filter((page) => page.object !== "data_source" && page.properties)
		.map(pageToEntry);
}

export async function findBySlug(notion: Client, slug: string): Promise<NotionPage | null> {
	const response = await notion.dataSources.query({
		data_source_id: FOCUSLAB_DATA_SOURCE_ID,
		page_size: 1,
		filter: { property: PROPS.slug, rich_text: { equals: slug } },
	} as any);
	const results = response.results as unknown as NotionPage[];
	const page = results.find((item) => item.object !== "data_source" && item.properties);
	return page ?? null;
}

export function buildProperties(
	input: ContentInput,
	options: { partial?: boolean } = {},
): Record<string, any> {
	const props: Record<string, any> = {};
	const set = (key: string, value: any) => {
		if (value !== undefined) props[key] = value;
	};

	set(PROPS.title, input.name !== undefined ? { title: richText(input.name) } : undefined);
	set(PROPS.slug, input.slug !== undefined ? { rich_text: richText(input.slug) } : undefined);
	set(PROPS.type, input.type !== undefined ? { select: { name: input.type } } : undefined);
	set(
		PROPS.summary,
		input.summary !== undefined ? { rich_text: richText(input.summary) } : undefined,
	);
	set(
		PROPS.tags,
		input.tags !== undefined ? { multi_select: input.tags.map((name) => ({ name })) } : undefined,
	);
	set(PROPS.url, input.link !== undefined ? { url: input.link || null } : undefined);
	set(PROPS.date, input.date !== undefined ? { date: { start: input.date } } : undefined);
	set(PROPS.order, input.order !== undefined ? { number: input.order } : undefined);
	set(PROPS.featured, input.featured !== undefined ? { checkbox: input.featured } : undefined);
	set(PROPS.published, input.published !== undefined ? { checkbox: input.published } : undefined);

	if (options.partial) {
		// For updates, `undefined` already means "leave untouched".
		return props;
	}

	// For creates, fill in required defaults so the row is valid.
	if (!props[PROPS.title]) throw new Error("`name` is required when creating content.");
	if (!props[PROPS.type]) {
		props[PROPS.type] = { select: { name: "Article" satisfies ContentType } };
	}
	if (!props[PROPS.published]) props[PROPS.published] = { checkbox: false };
	return props;
}

export function assertType(value: string): ContentType {
	if (!(CONTENT_TYPES as readonly string[]).includes(value)) {
		throw new Error(`Unknown content type "${value}". Use one of: ${CONTENT_TYPES.join(", ")}.`);
	}
	return value as ContentType;
}