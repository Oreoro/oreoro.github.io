/**
 * Context.dev CLI (TypeScript).
 *
 *   node scripts/context.mts markdown <url> [--fresh] [--max-age=MS] [--json]
 *   node scripts/context.mts styleguide <domain> [--scheme=light|dark|system] [--json]
 *   node scripts/context.mts brand <domain> [--json]
 *   node scripts/context.mts sitemap <domain> [--max-links=N] [--regex=PATTERN] [--json]
 *   node scripts/context.mts --dry-run
 *
 * Requires CONTEXT_DEV_API_KEY in the environment (.env.local or .env).
 */

import { readFileSync } from "node:fs";
import {
	scrapeMarkdown,
	extractStyleguide,
	retrieveBrand,
	scrapeSitemap,
	scrapeFonts,
	scrapeHtml,
	scrapeImages,
	hasContextDevApiKey,
	ContextDevError,
} from "../src/lib/context-dev.ts";

function loadEnvFile(path: string): void {
	try {
		const text = readFileSync(path, "utf8");
		for (const line of text.split("\n")) {
			const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
			if (!match) continue;
			const key = match[1] as string;
			let value = (match[2] ?? "").trim();
			if (
				(value.startsWith('"') && value.endsWith('"')) ||
				(value.startsWith("'") && value.endsWith("'"))
			) {
				value = value.slice(1, -1);
			}
			if (!process.env[key]) process.env[key] = value;
		}
	} catch {
		// Optional file.
	}
}

function parseFlags(argv: string[]): { flags: Map<string, string>; positional: string[] } {
	const flags = new Map<string, string>();
	const positional: string[] = [];
	for (const arg of argv) {
		if (!arg.startsWith("--")) {
			positional.push(arg);
			continue;
		}
		const [rawKey, rawValue] = arg.slice(2).split("=");
		flags.set(rawKey ?? "", rawValue ?? "true");
	}
	return { flags, positional };
}

function usage(): void {
	console.error(
		[
			"Usage: node scripts/context.mts <command> [args] [options]",
			"",
			"Commands:",
			"  markdown <url>       Scrape a URL into clean Markdown",
			"  html <url>           Scrape a URL into rendered HTML",
			"  images <url>         List image assets referenced by a page",
			"  fonts <domain>       Font families, usage and font-file URLs",
			"  styleguide <domain>  Extract colors / typography / components",
			"  brand <domain>       Retrieve brand profile (logos, colors, socials)",
			"  sitemap <domain>     Discover URLs from public sitemaps",
			"",
			"Options:",
			"  --fresh              markdown: bypass cache (maxAgeMs=0)",
			"  --max-age=MS         markdown: accept cache younger than MS",
			"  --scheme=light|dark  styleguide: rendered color scheme",
			"  --max-links=N        sitemap: maximum URLs",
			"  --regex=PATTERN      sitemap: filter URLs",
			"  --json               print the full JSON result",
			"  --dry-run            validate configuration without calling the API",
			"  --help               show this message",
		].join("\n"),
	);
}

function reportError(error: unknown): void {
	if (error instanceof ContextDevError) {
		console.error(
			`Context.dev error${error.status ? ` (HTTP ${error.status})` : ""}: ${error.message}` +
				(error.code ? ` [${error.code}]` : "") +
				(error.requestId ? ` (request ${error.requestId})` : ""),
		);
	} else {
		console.error(error);
	}
	process.exitCode = 1;
}

function summary(label: string, parts: Array<string | undefined>): void {
	const filtered = parts.filter((part): part is string => Boolean(part));
	if (filtered.length) console.error(`\n[context.dev] ${label} · ${filtered.join(" · ")}`);
}

async function main(): Promise<void> {
	loadEnvFile(".env.local");
	loadEnvFile(".env");

	const { flags, positional } = parseFlags(process.argv.slice(2));
	const command = positional[0];

	if (flags.has("help")) {
		usage();
		return;
	}

	if (flags.has("dry-run")) {
		console.log(
			JSON.stringify(
				{
					ok: true,
					command: command ?? null,
					arg: positional[1] ?? null,
					keyPresent: hasContextDevApiKey(),
					baseUrl: "https://api.context.dev/v1",
				},
				null,
				2,
			),
		);
		return;
	}

	if (!command) {
		usage();
		process.exitCode = 1;
		return;
	}

	if (!hasContextDevApiKey()) {
		console.error(
			"CONTEXT_DEV_API_KEY is not set. Add it to .env.local, or export it in your shell.",
		);
		process.exitCode = 1;
		return;
	}

	const asJson = flags.has("json");

	try {
		switch (command) {
			case "markdown": {
				const url = positional[1];
				if (!url) {
					usage();
					process.exitCode = 1;
					return;
				}
				const maxAgeFlag = flags.get("max-age");
				const maxAgeMs = maxAgeFlag ? Number(maxAgeFlag) : flags.has("fresh") ? 0 : undefined;
				const result = await scrapeMarkdown(url, {
					maxAgeMs,
					useMainContentOnly: true,
					timeoutMs: 30_000,
					timeoutBehavior: "fail",
				});
				if (asJson) {
					console.log(JSON.stringify(result, null, 2));
				} else {
					console.log(`# ${result.title ?? result.url}\n`);
					console.log(result.markdown);
					summary(`${result.contentLength} bytes`, [
						result.cacheStatus ? `cache ${result.cacheStatus}` : undefined,
						result.creditsConsumed !== undefined
							? `${result.creditsConsumed} credit(s)`
							: undefined,
						result.requestId ? `request ${result.requestId}` : undefined,
					]);
				}
				return;
			}

			case "styleguide": {
				const domain = positional[1];
				if (!domain) {
					usage();
					process.exitCode = 1;
					return;
				}
				const scheme = flags.get("scheme");
				const result = await extractStyleguide({
					domain,
					colorScheme:
						scheme === "light" || scheme === "dark" || scheme === "system" ? scheme : undefined,
				});
				if (asJson) {
					console.log(JSON.stringify(result, null, 2));
				} else {
					console.log(JSON.stringify(result.styleguide ?? {}, null, 2));
					summary(domain, [
						result.cacheStatus ? `cache ${result.cacheStatus}` : undefined,
						result.creditsConsumed !== undefined
							? `${result.creditsConsumed} credit(s)`
							: undefined,
					]);
				}
				return;
			}

			case "brand": {
				const domain = positional[1];
				if (!domain) {
					usage();
					process.exitCode = 1;
					return;
				}
				const result = await retrieveBrand({ lookup: { type: "by_domain", domain } });
				if (asJson) {
					console.log(JSON.stringify(result, null, 2));
				} else {
					console.log(JSON.stringify(result.brand ?? {}, null, 2));
					summary(domain, [
						result.cacheStatus ? `cache ${result.cacheStatus}` : undefined,
						result.creditsConsumed !== undefined
							? `${result.creditsConsumed} credit(s)`
							: undefined,
					]);
				}
				return;
			}

			case "sitemap": {
				const domain = positional[1];
				if (!domain) {
					usage();
					process.exitCode = 1;
					return;
				}
				const maxLinksFlag = flags.get("max-links");
				const result = await scrapeSitemap({
					domain,
					maxLinks: maxLinksFlag ? Number(maxLinksFlag) : undefined,
					urlRegex: flags.get("regex"),
				});
				if (asJson) {
					console.log(JSON.stringify(result, null, 2));
				} else {
					console.log(result.urls.join("\n"));
					summary(`${result.urls.length} URL(s)`, [
						result.creditsConsumed !== undefined
							? `${result.creditsConsumed} credit(s)`
							: undefined,
					]);
				}
				return;
			}

			case "fonts": {
				const domain = positional[1];
				if (!domain) {
					usage();
					process.exitCode = 1;
					return;
				}
				const result = await scrapeFonts({ domain });
				if (asJson) {
					console.log(JSON.stringify(result, null, 2));
				} else {
					console.log(JSON.stringify({ fonts: result.fonts, fontLinks: result.fontLinks }, null, 2));
					summary(`${result.fonts.length} font(s)`, [
						result.creditsConsumed !== undefined
							? `${result.creditsConsumed} credit(s)`
							: undefined,
					]);
				}
				return;
			}

			case "html": {
				const url = positional[1];
				if (!url) {
					usage();
					process.exitCode = 1;
					return;
				}
				const result = await scrapeHtml({ url, useMainContentOnly: true });
				if (asJson) {
					console.log(JSON.stringify({ ...result, html: `${result.html.length} chars` }, null, 2));
				} else {
					console.log(result.html);
					summary(`${result.html.length} chars of HTML`, [
						result.creditsConsumed !== undefined
							? `${result.creditsConsumed} credit(s)`
							: undefined,
					]);
				}
				return;
			}

			case "images": {
				const url = positional[1];
				if (!url) {
					usage();
					process.exitCode = 1;
					return;
				}
				const result = await scrapeImages({ url, dedupe: true });
				if (asJson) {
					console.log(JSON.stringify(result, null, 2));
				} else {
					console.log(JSON.stringify(result.images, null, 2));
					summary(`${result.images.length} image(s)`, [
						result.creditsConsumed !== undefined
							? `${result.creditsConsumed} credit(s)`
							: undefined,
					]);
				}
				return;
			}

			default:
				usage();
				process.exitCode = 1;
		}
	} catch (error) {
		reportError(error);
	}
}

void main();