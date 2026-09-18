/**
 * Generic Notion property mapping.
 *
 * The goal: render content from ANY Notion data source without being boxed into
 * one fixed database layout. We inspect the schema and guess which property plays
 * which role, then allow explicit overrides per field.
 */

export interface PropertyLike {
	type: string;
	formula?: { expression?: string };
	select?: { options?: Array<{ name: string }> };
	multi_select?: { options?: Array<{ name: string }> };
	status?: { options?: Array<{ name: string }> };
}

export type PropertyMap = Record<string, PropertyLike>;

/** Which Notion property (if any) feeds each normalized field. */
export interface FieldMap {
	title: string | null;
	slug: string | null;
	type: string | null;
	date: string | null;
	summary: string | null;
	tags: string | null;
	cover: string | null;
	published: string | null;
	order: string | null;
	url: string | null;
	authors: string | null;
	pinned: string | null;
}

const NAME_PATTERNS = {
	slug: /slug/i,
	type: /^(type|collection|category|kind|section)$/i,
	typeLoose: /type|collection|category|kind/i,
	date: /publish|date|created|updated/i,
	summary: /excerpt|summary|description|subtitle|intro|blurb/i,
	tags: /tags|categories|topics|labels/i,
	cover: /featured|cover|image|thumbnail|hero|banner/i,
	published: /published|live|visible|public/i,
	order: /order|rank|position|sort|weight/i,
	url: /link|url|website|href/i,
	authors: /authors?|writers?|by/i,
	pinned: /pinned|featured|sticky|highlight/i,
};

function firstMatch(
	properties: PropertyMap,
	types: string[],
	pattern: RegExp | null,
): string | null {
	const entries = Object.entries(properties);
	// Prefer a name match that also has an acceptable type.
	if (pattern) {
		for (const [name, prop] of entries) {
			if (types.includes(prop.type) && pattern.test(name)) return name;
		}
	}
	// Fall back to the first property of an acceptable type.
	for (const [name, prop] of entries) {
		if (types.includes(prop.type)) return name;
	}
	return null;
}

function firstByName(properties: PropertyMap, pattern: RegExp, types: string[]): string | null {
	for (const [name, prop] of Object.entries(properties)) {
		if (types.includes(prop.type) && pattern.test(name)) return name;
	}
	return null;
}

const TEXT_TYPES = ["rich_text", "url", "formula", "title"];
const DATE_TYPES = ["date", "created_time", "last_edited_time", "formula"];

export function detectFieldMap(
	properties: PropertyMap,
	overrides: Partial<FieldMap> = {},
): FieldMap {
	const detected: FieldMap = {
		title: firstMatch(properties, ["title"], null),
		slug: firstByName(properties, NAME_PATTERNS.slug, TEXT_TYPES),
		type:
			firstByName(properties, NAME_PATTERNS.type, ["select", "status"]) ??
			firstByName(properties, NAME_PATTERNS.typeLoose, ["select", "status"]),
		date: firstByName(properties, NAME_PATTERNS.date, DATE_TYPES),
		summary: firstByName(properties, NAME_PATTERNS.summary, ["rich_text"]),
		tags: firstByName(properties, NAME_PATTERNS.tags, ["multi_select"]),
		cover:
			firstByName(properties, NAME_PATTERNS.cover, ["files", "url"]) ??
			firstMatch(properties, ["files"], null),
		published: firstByName(properties, NAME_PATTERNS.published, ["checkbox"]),
		order: firstByName(properties, NAME_PATTERNS.order, ["number"]),
		url: firstByName(properties, NAME_PATTERNS.url, ["url"]),
		authors: firstByName(properties, NAME_PATTERNS.authors, ["multi_select"]),
		pinned: firstByName(properties, NAME_PATTERNS.pinned, ["checkbox"]),
	};

	// Explicit overrides win. A null override means "disable this field".
	for (const [key, value] of Object.entries(overrides)) {
		if (value !== undefined) detected[key as keyof FieldMap] = value as string | null;
	}

	return detected;
}

/**
 * Properties consumed by normalized fields and therefore excluded from `Fields`.
 * Note: `map.url` is intentionally NOT excluded — a generic link column should
 * still surface to templates via `entry.Fields`, and must not be confused with
 * the special "External URL" content-source property.
 */
export function mappedPropertyNames(map: FieldMap): Set<string> {
	return new Set(
		[
			map.title,
			map.slug,
			map.type,
			map.date,
			map.summary,
			map.tags,
			map.cover,
			map.published,
			map.order,
			map.authors,
			map.pinned,
		].filter((value): value is string => Boolean(value)),
	);
}