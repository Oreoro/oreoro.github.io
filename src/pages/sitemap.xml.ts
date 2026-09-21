import { stream } from "@/data/stream";
import { policies } from "@/data/policies";
import { products } from "@/data/products";

export const GET = () => {
	const paths = [
		"/",
		"/studio/",
		"/books/",
		"/stack/",
		...products.map((product) => `/products/${product.slug}/`),
		"/thoughts/",
		"/jobs/",
		"/podcast/",
		"/policies/",
		...policies.map((policy) => `/policies/${policy.slug}/`),
		"/contact/",
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
