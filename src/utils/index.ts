import { getAllPages, getDataSource } from "@/lib/notion/client";

import { MENU_PAGES_COLLECTION, HOME_PAGE_SLUG } from "@/constants";
import { slugify } from "@/utils/slugify";
import { getNavLink } from "@/lib/blog-helpers";
import { detectFieldMap, type PropertyMap } from "@/lib/content/schema";
import { CONTENT_FIELD_OVERRIDES } from "@/lib/content/config";
export {
	getFormattedDate,
	getFormattedDateWithTime,
	getCalendarDateParts,
	getCalendarDateString,
	getDateObject,
	getDateTimeValue,
	getMachineDateISOString,
	areDifferentDates,
} from "@/utils/date";
export { generateToc, buildHeadings } from "@/utils/generateToc";
export type { TocItem } from "@/utils/generateToc";
export { getWebmentionsForUrl } from "@/utils/webmentions";
export { slugify } from "@/utils/slugify";
export {
	numberToAlphabet,
	getSymbolForLinkedContent,
	LINKED_CONTENT_SYMBOLS,
} from "@/utils/numbering";

/**
 * Options of whichever property acts as the "type/collection" field, whether
 * that is a select or a status property. Schema-agnostic.
 */
async function getTypeOptions(): Promise<{ name: string; description: string }[]> {
	const { propertiesRaw } = await getDataSource();
	const properties = propertiesRaw as unknown as PropertyMap;
	const map = detectFieldMap(properties, CONTENT_FIELD_OVERRIDES);
	if (!map.type) return [];

	const prop = properties[map.type] as any;
	const options = prop?.select?.options || prop?.status?.options || [];
	return options.map((option: any) => ({
		name: option.name,
		description: option.description || "",
	}));
}

export async function getCollections() {
	return (await getTypeOptions())
		.map(({ name }) => name)
		.filter((name) => name !== MENU_PAGES_COLLECTION);
}

export async function getCollectionsWDesc() {
	return (await getTypeOptions()).filter(({ name }) => name !== MENU_PAGES_COLLECTION);
}

export async function getMenu(): Promise<
	{ title: string; path: string; children?: { title: string; path: string }[] }[]
> {
	const withTrailingSlash = (path: string) => {
		if (path === "/") return "/";
		return path.endsWith("/") ? path : `${path}/`;
	};
	const pages = await getAllPages();
	const collections = await getCollections();
	const collectionLinks = collections.map((name) => ({
		title: name,
		path: withTrailingSlash(getNavLink("/collections/" + slugify(name))),
	}));

	const pageLinks = pages
		.map((page) => ({
			...page,
			// Assign rank -1 to homePageSlug and 99 to pages with no rank
			Rank:
				page.Slug === HOME_PAGE_SLUG
					? -1
					: page.Rank === undefined || page.Rank === null
						? 99
						: page.Rank,
		}))
		.sort((a, b) => a.Rank - b.Rank)
		.map((page) => ({
			title: page.Title,
			path: withTrailingSlash(getNavLink(page.Slug === HOME_PAGE_SLUG ? "/" : "/" + page.Slug)),
		}));

	return [...pageLinks, ...collectionLinks];
}
