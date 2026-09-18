/**
 * Focus Lab CMS Worker configuration.
 *
 * These defaults point at the live "Focus Lab CMS" data source. Override with
 * worker secrets if you fork the database.
 */

export const FOCUSLAB_DATA_SOURCE_ID =
	process.env.FOCUSLAB_DATA_SOURCE_ID ?? "53b6280a-42b0-4026-b7e5-2cf864d30878";

export const SITE_URL = process.env.FOCUSLAB_SITE_URL ?? "https://focuslab.pk";

export const CONTENT_TYPES = ["Page", "Product", "Article", "Update"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const TAG_OPTIONS = [
	"AI",
	"SaaS",
	"Mobile",
	"Ecommerce",
	"Framer",
	"Shopify",
	"Design",
	"Engineering",
] as const;

/** Property names in the Focus Lab CMS data source. */
export const PROPS = {
	title: "Name",
	slug: "Slug",
	type: "Type",
	date: "Date",
	summary: "Summary",
	tags: "Tags",
	cover: "Image",
	published: "Published",
	order: "Order",
	url: "Link",
	featured: "Featured",
} as const;

export function contentUrl(slug: string): string {
	const clean = slug.replace(/^\/+|\/+$/g, "");
	if (!clean || clean === "home") return `${SITE_URL}/`;
	return `${SITE_URL}/${clean}`;
}

export function slugify(value: string): string {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_]+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-+|-+$/g, "");
}