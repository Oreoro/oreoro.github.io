/**
 * Pull the design + structure reference for a domain into reference/<domain>/.
 *
 *   node scripts/context-clone.mts 37signals.com
 *   node scripts/context-clone.mts 37signals.com --max-links=200 --scheme=light,dark
 *
 * Writes styleguide (per scheme), fonts, brand and sitemap. These are design
 * tokens, brand facts and URLs — not page copy. Requires CONTEXT_DEV_API_KEY.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
	extractStyleguide,
	scrapeFonts,
	retrieveBrand,
	scrapeSitemap,
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

function writeJson(dir: string, name: string, data: unknown): void {
	writeFileSync(join(dir, name), JSON.stringify(data, null, 2) + "\n", "utf8");
}

async function main(): Promise<void> {
	loadEnvFile(".env.local");
	loadEnvFile(".env");

	const { flags, positional } = parseFlags(process.argv.slice(2));
	const domain = positional[0];

	if (flags.has("help") || !domain) {
		console.error(
			"Usage: node scripts/context-clone.mts <domain> [--max-links=N] [--scheme=light,dark] [--out=DIR]",
		);
		process.exitCode = domain ? 0 : 1;
		return;
	}

	if (!hasContextDevApiKey()) {
		console.error("CONTEXT_DEV_API_KEY is not set.");
		process.exitCode = 1;
		return;
	}

	const outRoot = flags.get("out") ?? "reference";
	const dir = join(outRoot, domain);
	mkdirSync(dir, { recursive: true });

	const maxLinks = flags.has("max-links") ? Number(flags.get("max-links")) : 200;
	const schemes = (flags.get("scheme") ?? "light,dark")
		.split(",")
		.map((value) => value.trim())
		.filter((value): value is "light" | "dark" | "system" =>
			value === "light" || value === "dark" || value === "system",
		);

	const summary: Record<string, unknown> = { domain, output: dir };

	try {
		for (const scheme of schemes) {
			const result = await extractStyleguide({ domain, colorScheme: scheme });
			writeJson(dir, `styleguide-${scheme}.json`, result.styleguide ?? {});
			summary[`styleguide_${scheme}`] = {
				credits: result.creditsConsumed,
				colors: result.styleguide?.colors ?? null,
			};
			console.error(`  styleguide(${scheme}) ✓`);
		}

		const fonts = await scrapeFonts({ domain });
		writeJson(dir, "fonts.json", { fonts: fonts.fonts, fontLinks: fonts.fontLinks });
		summary.fonts = {
			count: fonts.fonts.length,
			links: fonts.fontLinks.length,
			credits: fonts.creditsConsumed,
		};
		console.error(`  fonts ✓`);

		const brand = await retrieveBrand({ lookup: { type: "by_domain", domain } });
		writeJson(dir, "brand.json", brand.brand ?? {});
		summary.brand = {
			title: (brand.brand as { title?: string } | undefined)?.title ?? null,
			credits: brand.creditsConsumed,
		};
		console.error(`  brand ✓`);

		const sitemap = await scrapeSitemap({ domain, maxLinks });
		writeJson(dir, "sitemap.json", sitemap.urls);
		summary.sitemap = { urls: sitemap.urls.length, credits: sitemap.creditsConsumed };
		console.error(`  sitemap ✓`);

		writeJson(dir, "summary.json", summary);
		console.log(JSON.stringify(summary, null, 2));
	} catch (error) {
		if (error instanceof ContextDevError) {
			console.error(
				`Context.dev error${error.status ? ` (HTTP ${error.status})` : ""}: ${error.message}` +
					(error.code ? ` [${error.code}]` : ""),
			);
		} else {
			console.error(error);
		}
		process.exitCode = 1;
	}
}

void main();