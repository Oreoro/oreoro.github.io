import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

/**
 * Generate sitemap.xml from what the build actually produced.
 *
 * The previous sitemap was a hand-kept list of paths in src/pages/sitemap.xml.ts.
 * That is a silent SEO failure waiting to happen: a new page builds fine, looks
 * fine, and is simply absent from the sitemap because nobody remembered to add
 * it. Nothing fails, nothing warns.
 *
 * Membership is decided by the page itself. Astro emits a small HTML stub for
 * every entry in `redirects`, and the 404 page is marked noindex; both already
 * say, in their own markup, that they should not be indexed. Reading that one
 * meta tag means the sitemap holds exactly the pages that ask to be in it, with
 * no exclusion list here to fall out of date.
 *
 * Deliberately omitted: lastmod. Every build would restamp every page, which
 * tells crawlers the whole site changed — worse than saying nothing.
 */
const SITEMAP_PATH = "sitemap.xml";

/** Directories that hold build output rather than pages. */
const SKIP_DIRS = new Set(["_astro"]);

/** True when a built page has asked not to be indexed. */
const isNoindex = (file: string): boolean => {
	try {
		const html = fs.readFileSync(file, "utf8");
		const robots = /<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i.exec(html);
		return robots?.[1] ? /\bnoindex\b/i.test(robots[1]) : false;
	} catch {
		return true; // Unreadable page: leave it out rather than risk a soft 404.
	}
};

/** Collect the route path of every indexable index.html under `dir`. */
function collect(dir: string, base: string, out: string[]): void {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (entry.name.startsWith(".")) continue;
		const full = path.join(dir, entry.name);
		const route = base === "" ? `/${entry.name}` : `${base}/${entry.name}`;

		if (entry.isDirectory()) {
			if (SKIP_DIRS.has(entry.name)) continue;
			// A directory is a route when it holds an index.html of its own.
			const index = path.join(full, "index.html");
			if (fs.existsSync(index) && !isNoindex(index)) out.push(`${route}/`);
			collect(full, route, out);
		}
	}
}

const escape = (value: string) =>
	value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default (): AstroIntegration => {
	// astro:build:done is not handed the resolved config, so keep the two values
	// it needs from astro:config:done.
	let site = "";
	let base = "";

	return {
		name: "sitemap-from-build-output",
		hooks: {
			"astro:config:done": ({ config }) => {
				site = (config.site?.toString() ?? "").replace(/\/$/, "");
				base = (config.base ?? "/").replace(/^\//, "").replace(/\/$/, "");
			},
			"astro:build:done": async ({ dir, logger }) => {
				if (!site) {
					logger.warn("sitemap-from-build-output: no `site` in astro.config, skipping.");
					return;
				}

				const outDir = fileURLToPath(dir);
				const paths: string[] = [];
				collect(outDir, base, paths);

				// The output root is a route but has no directory name of its own.
				if (!isNoindex(path.join(outDir, "index.html"))) paths.push(`/${base}/`.replace("//", "/"));

				const unique = [...new Set(paths)].sort();
				const urls = unique
					.map((p) => `  <url><loc>${escape(new URL(p, `${site}/`).toString())}</loc></url>`)
					.join("\n");

				fs.writeFileSync(
					path.join(outDir, SITEMAP_PATH),
					`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
					"utf8",
				);

				logger.info(`sitemap-from-build-output: ${unique.length} indexable URLs written.`);
			},
		},
	};
};
