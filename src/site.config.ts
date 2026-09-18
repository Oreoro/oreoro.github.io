import { getDataSource } from "@/lib/notion/client";
import type { SiteConfig } from "@/types";
import { AUTHOR, WEBMENTION_LINK, HOME_PAGE_SLUG } from "@/constants";

const tl = "Focus Lab",
	ds = "A product company in Islamabad. We build and operate our own AI, SaaS, mobile, and ecommerce products — and we're open to contract work.",
	path = "/",
	oim = "";
const database = await getDataSource();

// Explicit site identity wins over the Notion database title/description.
const siteTitle = tl || database.Title;
const siteDescription = ds || database.Description;

export const siteInfo: SiteConfig = {
	title: siteTitle,
	description: siteDescription,
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
		// link: "https://webmention.io/astro-cactus.chriswilliams.dev/webmention",
		// site: "https://astro-cactus.chriswilliams.dev/",
	},
	logo: database.Icon || null,
};
