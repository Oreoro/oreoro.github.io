import { stream } from "@/data/stream";
import { thoughts } from "@/data/thoughts";
import { episodes } from "@/data/podcast";
import { policies } from "@/data/policies";

export const GET = () => {
	const paths = [
		"/",
		"/books/",
		"/stack/",
		"/thoughts/",
		...thoughts.map((thought) => `/thoughts/${thought.slug}/`),
		"/jobs/",
		"/podcast/",
		...episodes.map((episode) => `/podcast/${episode.slug}/`),
		"/policies/",
		...policies.map((policy) => `/policies/${policy.slug}/`),
		"/downloads/",
		"/signup/",
		...stream.map((entry) => `/${entry.num}/`),
	];

	const entries = paths
		.map((path) => `<url><loc>${new URL(path, import.meta.env.SITE).toString()}</loc></url>`)
		.join("");

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			"Content-Type": "text/xml",
		},
	});
};
