import rss from "@astrojs/rss";
import { stream } from "@/data/stream";
import { siteInfo } from "@/siteInfo";
import { getNavLink } from "@/lib/blog-helpers";

export const GET = () => {
	return rss({
		stylesheet: getNavLink("/rss-styles.xsl"),
		title: siteInfo.title,
		description: siteInfo.description,
		site: import.meta.env.SITE,
		customData: `<language>${siteInfo.lang}</language>`,
		items: stream.map((entry) => ({
			title: `${entry.num}. ${entry.label}`,
			description: entry.label,
			content: entry.content,
			pubDate: new Date(entry.date),
			link: `/${entry.num}/`,
		})),
	});
};
