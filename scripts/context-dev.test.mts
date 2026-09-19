/**
 * Focused tests for the Context.dev wrapper.
 *
 * These never hit the live API: fetch is injected. Run with:
 *   node --test scripts/context-dev.test.mts
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import {
	scrapeMarkdown,
	extractStyleguide,
	retrieveBrand,
	scrapeSitemap,
	scrapeFonts,
	scrapeHtml,
	scrapeImages,
	ContextDevError,
} from "../src/lib/context-dev.ts";

type FetchArgs = { url: string; init: RequestInit };

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}) {
	const normalized = new Map(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v]));
	return {
		ok: status >= 200 && status < 300,
		status,
		headers: { get: (name: string) => normalized.get(name.toLowerCase()) ?? null },
		text: async () => JSON.stringify(body),
	} as unknown as Response;
}

function successBody(markdown: string) {
	return {
		success: true,
		url: "https://example.com",
		markdown,
		contentLength: markdown.length,
		request_id: "req_123",
		finalDOMState: "loaded",
		metadata: { finalUrl: "https://example.com", title: "Example Domain" },
		cache_metadata: { status: "miss", age_ms: 0 },
		key_metadata: { credits_consumed: 1, credits_remaining: 999 },
	};
}

test("builds the request and returns markdown", async () => {
	let seen: FetchArgs | undefined;
	const fakeFetch = (async (input: URL | RequestInfo, init?: RequestInit) => {
		seen = { url: input.toString(), init: init ?? {} };
		return jsonResponse(successBody("# Example Domain\n\nHello."));
	}) as unknown as typeof fetch;

	const result = await scrapeMarkdown("https://example.com", {
		apiKey: "ctxt_test",
		fetchImpl: fakeFetch,
		maxAgeMs: 0,
	});

	assert.equal(result.markdown, "# Example Domain\n\nHello.");
	assert.equal(result.title, "Example Domain");
	assert.equal(result.creditsConsumed, 1);

	assert.ok(seen, "fetch was called");
	assert.match(seen!.url, /\/v1\/web\/scrape\/markdown\?/);
	assert.match(seen!.url, /url=https%3A%2F%2Fexample\.com/);
	assert.match(seen!.url, /useMainContentOnly=true/);
	assert.match(seen!.url, /maxAgeMs=0/);
	assert.match(seen!.url, /timeoutOpts%5Bbehavior%5D=fail/);
	const headers = seen!.init.headers as Record<string, string>;
	assert.equal(headers.Authorization, "Bearer ctxt_test");
});

test("retries on 429 then succeeds", async () => {
	let calls = 0;
	const fakeFetch = (async () => {
		calls += 1;
		if (calls === 1) {
			return jsonResponse(
				{ message: "Rate limited", error_code: "RATE_LIMITED" },
				429,
				{ "retry-after": "0" },
			);
		}
		return jsonResponse(successBody("ok"));
	}) as unknown as typeof fetch;

	const result = await scrapeMarkdown("https://example.com", {
		apiKey: "ctxt_test",
		fetchImpl: fakeFetch,
		retries: 1,
		retryDelayMs: 0,
	});

	assert.equal(calls, 2);
	assert.equal(result.markdown, "ok");
});

test("does not retry a 400", async () => {
	let calls = 0;
	const fakeFetch = (async () => {
		calls += 1;
		return jsonResponse(
			{ message: "Invalid input", error_code: "INPUT_VALIDATION_ERROR" },
			400,
		);
	}) as unknown as typeof fetch;

	await assert.rejects(
		() =>
			scrapeMarkdown("https://example.com", {
				apiKey: "ctxt_test",
				fetchImpl: fakeFetch,
				retries: 3,
				retryDelayMs: 0,
			}),
		(error: unknown) => {
			assert.ok(error instanceof ContextDevError);
			assert.equal(error.status, 400);
			assert.equal(error.code, "INPUT_VALIDATION_ERROR");
			assert.equal(error.retryable, false);
			return true;
		},
	);

	assert.equal(calls, 1);
});

test("throws when the API key is missing", async () => {
	const previous = process.env.CONTEXT_DEV_API_KEY;
	delete process.env.CONTEXT_DEV_API_KEY;
	try {
		await assert.rejects(
			() =>
				scrapeMarkdown("https://example.com", {
					fetchImpl: (async () => jsonResponse(successBody("x"))) as unknown as typeof fetch,
				}),
			(error: unknown) => {
				assert.ok(error instanceof ContextDevError);
				assert.match(error.message, /CONTEXT_DEV_API_KEY/);
				return true;
			},
		);
	} finally {
		if (previous !== undefined) process.env.CONTEXT_DEV_API_KEY = previous;
	}
});

test("rejects an invalid URL without calling fetch", async () => {
	let called = false;
	const fakeFetch = (async () => {
		called = true;
		return jsonResponse(successBody("x"));
	}) as unknown as typeof fetch;

	await assert.rejects(
		() => scrapeMarkdown("not a url", { apiKey: "ctxt_test", fetchImpl: fakeFetch }),
		(error: unknown) => {
			assert.ok(error instanceof ContextDevError);
			assert.match(error.message, /Invalid URL/);
			return true;
		},
	);
	assert.equal(called, false);
});

test("extractStyleguide requests web/styleguide", async () => {
	let seen: FetchArgs | undefined;
	const fakeFetch = (async (input: URL | RequestInfo, init?: RequestInit) => {
		seen = { url: input.toString(), init: init ?? {} };
		return jsonResponse({
			styleguide: { colors: [{ hex: "#000000" }] },
			request_id: "req_style",
			cache_metadata: { status: "hit", age_ms: 10 },
			key_metadata: { credits_consumed: 10, credits_remaining: 90 },
		});
	}) as unknown as typeof fetch;

	const result = await extractStyleguide({
		domain: "37signals.com",
		colorScheme: "light",
		apiKey: "ctxt_test",
		fetchImpl: fakeFetch,
	});

	assert.ok(seen);
	assert.match(seen!.url, /\/v1\/web\/styleguide\?/);
	assert.match(seen!.url, /domain=37signals\.com/);
	assert.match(seen!.url, /colorScheme=light/);
	assert.equal(result.creditsConsumed, 10);
	assert.ok(result.styleguide);
});

test("retrieveBrand posts the lookup", async () => {
	let seen: FetchArgs | undefined;
	const fakeFetch = (async (input: URL | RequestInfo, init?: RequestInit) => {
		seen = { url: input.toString(), init: init ?? {} };
		return jsonResponse({ brand: { title: "Example" }, request_id: "req_brand" });
	}) as unknown as typeof fetch;

	const result = await retrieveBrand({
		lookup: { type: "by_domain", domain: "example.com" },
		apiKey: "ctxt_test",
		fetchImpl: fakeFetch,
	});

	assert.ok(seen);
	assert.equal(seen!.init.method, "POST");
	assert.match(seen!.url, /\/v1\/brand\/retrieve$/);
	assert.equal(JSON.parse(String(seen!.init.body)).domain, "example.com");
	assert.equal(result.brand?.title, "Example");
});

test("scrapeSitemap returns urls", async () => {
	let seen = "";
	const fakeFetch = (async (input: URL | RequestInfo) => {
		seen = input.toString();
		return jsonResponse({ urls: ["https://a.com/1", "https://a.com/2"], request_id: "req_map" });
	}) as unknown as typeof fetch;

	const result = await scrapeSitemap({
		domain: "a.com",
		maxLinks: 2,
		apiKey: "ctxt_test",
		fetchImpl: fakeFetch,
	});

	assert.match(seen, /\/v1\/web\/scrape\/sitemap\?/);
	assert.match(seen, /domain=a\.com/);
	assert.equal(result.urls.length, 2);
});

test("scrapeFonts requests web/fonts with a domain", async () => {
	let seen = "";
	const fakeFetch = (async (input: URL | RequestInfo) => {
		seen = input.toString();
		return jsonResponse({
			domain: "37signals.com",
			fonts: [{ family: "Lab Grotesque" }],
			fontLinks: ["https://example.com/font.woff2"],
			request_id: "req_fonts",
			key_metadata: { credits_consumed: 1, credits_remaining: 50 },
		});
	}) as unknown as typeof fetch;

	const result = await scrapeFonts({
		domain: "37signals.com",
		apiKey: "ctxt_test",
		fetchImpl: fakeFetch,
	});

	assert.match(seen, /\/v1\/web\/fonts\?/);
	assert.match(seen, /domain=37signals\.com/);
	assert.equal(result.fonts.length, 1);
	assert.equal(result.fontLinks.length, 1);
});

test("scrapeFonts requires a domain or directUrl", async () => {
	await assert.rejects(
		() => scrapeFonts({ apiKey: "ctxt_test" }),
		(error: unknown) => {
			assert.ok(error instanceof ContextDevError);
			assert.match(error.message, /domain or directUrl/);
			return true;
		},
	);
});

test("scrapeHtml returns rendered html", async () => {
	let seen = "";
	const fakeFetch = (async (input: URL | RequestInfo) => {
		seen = input.toString();
		return jsonResponse({ url: "https://example.com", html: "<html></html>", request_id: "r" });
	}) as unknown as typeof fetch;

	const result = await scrapeHtml({
		url: "https://example.com",
		apiKey: "ctxt_test",
		fetchImpl: fakeFetch,
	});

	assert.match(seen, /\/v1\/web\/scrape\/html\?/);
	assert.equal(result.html, "<html></html>");
});

test("scrapeImages returns an image manifest", async () => {
	let seen = "";
	const fakeFetch = (async (input: URL | RequestInfo) => {
		seen = input.toString();
		return jsonResponse({ url: "https://example.com", images: [{ url: "https://e.com/a.png" }], request_id: "r" });
	}) as unknown as typeof fetch;

	const result = await scrapeImages({
		url: "https://example.com",
		dedupe: true,
		apiKey: "ctxt_test",
		fetchImpl: fakeFetch,
	});

	assert.match(seen, /\/v1\/web\/scrape\/images\?/);
	assert.match(seen, /dedupe=true/);
	assert.equal(result.images.length, 1);
});