import rss from "@astrojs/rss";
import { siteInfo } from "@/siteInfo";

export const GET = () => {
	return rss({
		title: `${siteInfo.title} — Jobs`,
		description: "Job openings at Focus Lab.",
		site: import.meta.env.SITE,
		customData: `<language>${siteInfo.lang}</language>`,
		items: [],
	});
};
