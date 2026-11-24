import rss from "@astrojs/rss";
import { siteInfo } from "@/siteInfo";
import { podcasts } from "@/data/podcast";

export const GET = () => {
	return rss({
		title: `${siteInfo.title} — Listening list`,
		description:
			"Podcasts Focus Lab actually listens to — 10 shows from Pakistan on startups, tech, economy, and building.",
		site: import.meta.env.SITE,
		customData: `<language>${siteInfo.lang}</language>`,
		items: podcasts.map((podcast) => ({
			title: podcast.show,
			description: podcast.note,
			link: podcast.url,
			pubDate: new Date(),
		})),
	});
};