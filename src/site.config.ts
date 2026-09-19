import type { SiteConfig } from "@/types";
import { AUTHOR, WEBMENTION_LINK, HOME_PAGE_SLUG } from "@/constants";
import { site } from "@/data/focuslab";

export const siteInfo: SiteConfig = {
	title: site.name,
	description: site.description,
	author: AUTHOR,
	lang: "en",
	homePageSlug: HOME_PAGE_SLUG,
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "en",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "en",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	webmentions: {
		link: WEBMENTION_LINK,
	},
	logo: null,
};