/**
 * Local demo: scrape a URL into clean Markdown with Context.dev.
 *
 *   node scripts/context-scrape.mts https://example.com
 *   node scripts/context-scrape.mts https://example.com --fresh --json
 *   node scripts/context-scrape.mts --dry-run
 *
 * Requires CONTEXT_DEV_API_KEY in the environment (e.g. via .env.local).
 */

import { readFileSync } from "node:fs";
import { scrapeMarkdown, hasContextDevApiKey, ContextDevError } from "../src/lib/context-dev.ts";

function readEnvFile(path: string): void {
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
		// File is optional.
	}
}

function usage(): void {
	console.error(
		[
			"Usage: node scripts/context-scrape.mts <url> [options]",
			"",
			"Options:",
			"  --fresh         Bypass cache (maxAgeMs=0)",
			"  --max-age=MS    Accept a cached result younger than MS",
			"  --json          Print the full JSON result instead of Markdown",
			"  --dry-run       Validate configuration without calling the API",
			"  --help          Show this message",
		].join("\n"),
	);
}

async function main(): Promise<void> {
	readEnvFile(".env.local");
	readEnvFile(".env");

	const args = process.argv.slice(2);
	const flags = args.filter((arg) => arg.startsWith("--"));
	const positional = args.filter((arg) => !arg.startsWith("--"));

	if (flags.includes("--help") || (!positional[0] && !flags.includes("--dry-run"))) {
		usage();
		process.exitCode = positional[0] ? 0 : 1;
		return;
	}

	const maxAgeFlag = flags.find((flag) => flag.startsWith("--max-age="));
	const maxAgeMs = maxAgeFlag
		? Number(maxAgeFlag.split("=")[1])
		: flags.includes("--fresh")
			? 0
			: undefined;

	if (!hasContextDevApiKey()) {
		console.error(
			"CONTEXT_DEV_API_KEY is not set. Add it to .env.local, or export it in your shell.",
		);
		process.exitCode = 1;
		return;
	}

	const url = positional[0];

	if (flags.includes("--dry-run")) {
		console.log(
			JSON.stringify(
				{
					ok: true,
					url: url ?? null,
					useMainContentOnly: true,
					maxAgeMs: maxAgeMs ?? null,
					endpoint: "https://api.context.dev/v1/web/scrape/markdown",
					keyPresent: true,
				},
				null,
				2,
			),
		);
		return;
	}

	if (!url) {
		usage();
		process.exitCode = 1;
		return;
	}

	try {
		const result = await scrapeMarkdown(url, {
			maxAgeMs,
			useMainContentOnly: true,
			timeoutMs: 30_000,
			timeoutBehavior: "fail",
		});

		if (flags.includes("--json")) {
			console.log(JSON.stringify(result, null, 2));
		} else {
			console.log(`# ${result.title ?? result.url}\n`);
			console.log(result.markdown);
			console.error(
				`\n[context.dev] ${result.contentLength} bytes · cache ${result.cacheStatus ?? "n/a"} · ${result.creditsConsumed ?? "?"} credit(s) · request ${result.requestId ?? "n/a"}`,
			);
		}
	} catch (error) {
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
}

void main();