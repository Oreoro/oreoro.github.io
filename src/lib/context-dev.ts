/**
 * Context.dev server-side integration (TypeScript).
 *
 * Wraps the Context.dev v1 endpoints used by this project:
 *   - GET  /web/scrape/markdown   → LLM-ready Markdown (chrome/ads stripped)
 *   - GET  /web/styleguide        → observed colors, typography, components
 *   - POST /brand/retrieve        → brand profile (logos, colors, socials)
 *   - GET  /web/scrape/sitemap    → discover URLs from public sitemaps
 *
 * The API key is read from CONTEXT_DEV_API_KEY (or passed explicitly, which is
 * how the Cloudflare Worker passes env.CONTEXT_DEV_API_KEY). It is never sent
 * to the browser and never hardcoded.
 *
 * Docs: https://docs.context.dev/
 */

const DEFAULT_BASE_URL = "https://api.context.dev/v1";
const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_RETRIES = 2;
const DEFAULT_RETRY_DELAY_MS = 500;
const MAX_TIMEOUT_MS = 300_000;
const MAX_WAIT_FOR_MS = 30_000;

const RETRYABLE_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);

/* -------------------------------------------------------------- errors -- */

export interface ContextDevErrorOptions {
	status?: number | undefined;
	code?: string | undefined;
	requestId?: string | undefined;
	retryable?: boolean | undefined;
	retryAfterMs?: number | undefined;
}

export class ContextDevError extends Error {
	readonly status: number;
	readonly code: string | undefined;
	readonly requestId: string | undefined;
	readonly retryable: boolean;
	readonly retryAfterMs: number | undefined;

	constructor(message: string, options: ContextDevErrorOptions = {}) {
		super(message);
		this.name = "ContextDevError";
		this.status = options.status ?? 0;
		this.code = options.code;
		this.requestId = options.requestId;
		this.retryable = options.retryable ?? false;
		this.retryAfterMs = options.retryAfterMs;
	}
}

/* ----------------------------------------------------------- api key ----- */

function readProcessEnv(): Record<string, string | undefined> | undefined {
	const maybeProcess = (globalThis as { process?: { env?: Record<string, string | undefined> } })
		.process;
	return maybeProcess?.env;
}

/** True when a key is available from the explicit value or the environment. */
export function hasContextDevApiKey(explicit?: string): boolean {
	if (explicit && explicit.trim()) return true;
	return Boolean(readProcessEnv()?.CONTEXT_DEV_API_KEY?.trim());
}

function resolveApiKey(explicit?: string): string {
	const key = explicit?.trim() || readProcessEnv()?.CONTEXT_DEV_API_KEY?.trim();
	if (!key) {
		throw new ContextDevError(
			"CONTEXT_DEV_API_KEY is not set. Add it to .env.local for local use, or as a deployment secret (e.g. `wrangler secret put CONTEXT_DEV_API_KEY`).",
			{ status: 0, retryable: false },
		);
	}
	return key;
}

/* ------------------------------------------------------------- shared ---- */

type QueryValue = string | number | boolean | string[] | undefined;

export interface ContextDevClientOptions {
	/** Overrides CONTEXT_DEV_API_KEY. Used by the Worker with env.CONTEXT_DEV_API_KEY. */
	apiKey?: string;
	/** Overrides the API base URL. Defaults to https://api.context.dev/v1. */
	baseUrl?: string;
	/** Request deadline in ms. Defaults to 30_000, clamped to 300_000. */
	timeoutMs?: number;
	/** Retries for retryable failures (408/429/5xx/network). Defaults to 2. */
	retries?: number;
	/** Base delay for exponential backoff. Defaults to 500ms. */
	retryDelayMs?: number;
	/** Injectable fetch, used by tests. Defaults to global fetch. */
	fetchImpl?: typeof fetch;
	/** Optional caller abort signal. */
	signal?: AbortSignal;
}

interface RequestOptions extends ContextDevClientOptions {
	path: string;
	method?: "GET" | "POST";
	query?: Record<string, QueryValue>;
	body?: unknown;
	/** Adds timeoutOpts[milliseconds]/[behavior] (scrape endpoints only). */
	timeoutOpts?: { milliseconds: number; behavior: "fail" | "return-partial" } | undefined;
}

interface RawEnvelope {
	request_id?: string;
	message?: string;
	error_code?: string;
	cache_metadata?: { status?: string; age_ms?: number };
	key_metadata?: { credits_consumed?: number; credits_remaining?: number };
}

interface RequestResult<T> {
	data: T;
	status: number;
}

function clampTimeout(ms: number | undefined): number {
	const value = ms ?? DEFAULT_TIMEOUT_MS;
	return Math.min(Math.max(value, 1), MAX_TIMEOUT_MS);
}

function buildEndpoint(baseUrl: string | undefined, path: string, query?: Record<string, QueryValue>): URL {
	const base = (baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
	const endpoint = new URL(`${base}/${path.replace(/^\/+/, "")}`);
	for (const [key, value] of Object.entries(query ?? {})) {
		if (value === undefined) continue;
		if (Array.isArray(value)) {
			for (const item of value) endpoint.searchParams.append(key, String(item));
		} else {
			endpoint.searchParams.set(key, String(value));
		}
	}
	return endpoint;
}

function parseRetryAfterMs(headerValue: string | null): number | undefined {
	if (!headerValue) return undefined;
	const seconds = Number(headerValue);
	if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1000;
	const date = Date.parse(headerValue);
	if (!Number.isNaN(date)) return Math.max(0, date - Date.now());
	return undefined;
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function attemptRequest<T>(
	endpoint: URL,
	options: RequestOptions,
	apiKey: string,
	doFetch: typeof fetch,
	deadlineMs: number,
): Promise<RequestResult<T>> {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), deadlineMs);

	if (options.signal) {
		if (options.signal.aborted) controller.abort();
		else options.signal.addEventListener("abort", () => controller.abort(), { once: true });
	}

	try {
		const headers: Record<string, string> = {
			Authorization: `Bearer ${apiKey}`,
			Accept: "application/json",
		};
		if (options.body !== undefined) headers["Content-Type"] = "application/json";

		const init: RequestInit = {
			method: options.method ?? "GET",
			headers,
			signal: controller.signal,
		};
		if (options.body !== undefined) init.body = JSON.stringify(options.body);

		const response = await doFetch(endpoint, init);

		const bodyText = await response.text();
		let json: (RawEnvelope & Record<string, unknown>) | undefined;
		try {
			json = bodyText ? (JSON.parse(bodyText) as RawEnvelope & Record<string, unknown>) : undefined;
		} catch {
			json = undefined;
		}

		if (!response.ok) {
			throw new ContextDevError(
				json?.message ?? `Context.dev request failed with status ${response.status}`,
				{
					status: response.status,
					code: json?.error_code,
					requestId: json?.request_id,
					retryable: RETRYABLE_STATUS.has(response.status),
					retryAfterMs: parseRetryAfterMs(response.headers.get("retry-after")),
				},
			);
		}

		if (!json) {
			throw new ContextDevError("Malformed response from Context.dev: empty body", {
				status: response.status,
				retryable: false,
			});
		}

		return { data: json as unknown as T, status: response.status };
	} catch (error) {
		if (error instanceof ContextDevError) throw error;
		if (error instanceof Error && error.name === "AbortError") {
			throw new ContextDevError(`Context.dev request timed out after ${deadlineMs}ms`, {
				status: 408,
				retryable: true,
			});
		}
		const message = error instanceof Error ? error.message : String(error);
		throw new ContextDevError(`Network error calling Context.dev: ${message}`, {
			status: 0,
			retryable: true,
		});
	} finally {
		clearTimeout(timer);
	}
}

async function requestJson<T>(options: RequestOptions): Promise<RequestResult<T>> {
	const apiKey = resolveApiKey(options.apiKey);
	const doFetch = options.fetchImpl ?? fetch;
	const timeoutMs = clampTimeout(options.timeoutMs);
	const retries = Math.max(0, options.retries ?? DEFAULT_RETRIES);
	const retryDelayMs = Math.max(0, options.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS);
	const deadlineMs = timeoutMs + 5_000;

	const endpoint = buildEndpoint(options.baseUrl, options.path, options.query);
	if (options.timeoutOpts) {
		endpoint.searchParams.set("timeoutOpts[milliseconds]", String(options.timeoutOpts.milliseconds));
		endpoint.searchParams.set("timeoutOpts[behavior]", options.timeoutOpts.behavior);
	}

	let lastError: ContextDevError | undefined;
	for (let attempt = 0; attempt <= retries; attempt++) {
		try {
			return await attemptRequest<T>(endpoint, options, apiKey, doFetch, deadlineMs);
		} catch (error) {
			if (!(error instanceof ContextDevError) || !error.retryable || attempt === retries) {
				throw error;
			}
			lastError = error;
			const delay = error.retryAfterMs ?? retryDelayMs * 2 ** attempt;
			await sleep(delay);
		}
	}

	throw lastError ?? new ContextDevError("Context.dev request failed", { retryable: false });
}

/* ---------------------------------------------------- scrape markdown ---- */

export interface ScrapeMarkdownOptions extends ContextDevClientOptions {
	/** Keep only main content, dropping header/footer/sidebars/nav. Defaults to true. */
	useMainContentOnly?: boolean;
	/** Preserve hyperlinks in the Markdown. API default: true. */
	includeLinks?: boolean;
	/** Include image references. API default: false. */
	includeImages?: boolean;
	/** Shorten base64 image data. API default: true. */
	shortenBase64Images?: boolean;
	/** Also return the source HTML alongside the Markdown. API default: false. */
	includeHTML?: boolean;
	/** Return a cached result younger than this. API default: 1 day. Use 0 for fresh. */
	maxAgeMs?: number;
	/** Wait this long after load before converting. Max 30_000. */
	waitForMs?: number;
	/** Wait briefly for CSS/transition animations to settle. API default: false. */
	settleAnimations?: boolean;
	/** Keep only matching CSS subtrees. */
	includeSelectors?: string[];
	/** Remove matching CSS selectors (takes precedence over includeSelectors). */
	excludeSelectors?: string[];
	/** What to do at the deadline. Defaults to "fail". */
	timeoutBehavior?: "fail" | "return-partial";
}

export interface ScrapeMarkdownResult {
	url: string;
	finalUrl: string | undefined;
	markdown: string;
	contentLength: number;
	title: string | undefined;
	cacheStatus: string | undefined;
	cacheAgeMs: number | undefined;
	creditsConsumed: number | undefined;
	creditsRemaining: number | undefined;
	requestId: string | undefined;
	finalDOMState: string | undefined;
}

interface RawScrapeResponse extends RawEnvelope {
	success?: boolean;
	markdown?: string;
	contentLength?: number;
	url?: string;
	finalDOMState?: string;
	metadata?: { finalUrl?: string; title?: string };
}

function validateUrl(url: string): URL {
	let parsed: URL;
	try {
		parsed = new URL(url);
	} catch {
		throw new ContextDevError(`Invalid URL: ${url}`, { status: 0, retryable: false });
	}
	if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
		throw new ContextDevError(`URL must use http or https: ${url}`, {
			status: 0,
			retryable: false,
		});
	}
	return parsed;
}

/**
 * Scrape a URL into clean, LLM-ready Markdown.
 *
 * Retries retryable failures (408/429/5xx/network) with exponential backoff and
 * honors Retry-After on 429. Never caches locally — Context.dev caching is
 * controlled with `maxAgeMs`.
 */
export async function scrapeMarkdown(
	url: string,
	options: ScrapeMarkdownOptions = {},
): Promise<ScrapeMarkdownResult> {
	const parsed = validateUrl(url);
	const waitForMs =
		options.waitForMs !== undefined ? Math.min(options.waitForMs, MAX_WAIT_FOR_MS) : undefined;
	const timeoutMs =
		waitForMs !== undefined
			? Math.max(clampTimeout(options.timeoutMs), waitForMs + 10_000)
			: clampTimeout(options.timeoutMs);

	const query: Record<string, QueryValue> = {
		url: parsed.toString(),
		useMainContentOnly: options.useMainContentOnly ?? true,
		includeLinks: options.includeLinks,
		includeImages: options.includeImages,
		shortenBase64Images: options.shortenBase64Images,
		includeHTML: options.includeHTML,
		maxAgeMs: options.maxAgeMs,
		waitForMs,
		settleAnimations: options.settleAnimations,
		includeSelectors: options.includeSelectors,
		excludeSelectors: options.excludeSelectors,
		"timeoutOpts[milliseconds]": timeoutMs,
		"timeoutOpts[behavior]": options.timeoutBehavior ?? "fail",
	};

	const { data } = await requestJson<RawScrapeResponse>({
		...options,
		timeoutMs,
		path: "web/scrape/markdown",
		query,
	});

	if (typeof data.markdown !== "string") {
		throw new ContextDevError("Malformed response from Context.dev: missing markdown", {
			status: 200,
			requestId: data.request_id,
			retryable: false,
		});
	}

	const markdown = data.markdown;
	return {
		url: data.url ?? parsed.toString(),
		finalUrl: data.metadata?.finalUrl,
		markdown,
		contentLength: data.contentLength ?? markdown.length,
		title: data.metadata?.title,
		cacheStatus: data.cache_metadata?.status,
		cacheAgeMs: data.cache_metadata?.age_ms,
		creditsConsumed: data.key_metadata?.credits_consumed,
		creditsRemaining: data.key_metadata?.credits_remaining,
		requestId: data.request_id,
		finalDOMState: data.finalDOMState,
	};
}

/* --------------------------------------------------------- styleguide ---- */

export interface ExtractStyleguideOptions extends ContextDevClientOptions {
	/** Domain to inspect, e.g. "37signals.com". */
	domain: string;
	/** Which rendered scheme to observe. */
	colorScheme?: "light" | "dark" | "system";
}

export interface ExtractStyleguideResult {
	domain: string;
	styleguide: Record<string, unknown> | undefined;
	cacheStatus: string | undefined;
	creditsConsumed: number | undefined;
	creditsRemaining: number | undefined;
	requestId: string | undefined;
}

interface RawStyleguideResponse extends RawEnvelope {
	styleguide?: Record<string, unknown>;
}

/** Extract observed colors, typography, spacing and component styles for a domain. */
export async function extractStyleguide(
	options: ExtractStyleguideOptions,
): Promise<ExtractStyleguideResult> {
	const domain = options.domain.trim();
	if (!domain) {
		throw new ContextDevError("extractStyleguide requires a domain", {
			status: 0,
			retryable: false,
		});
	}

	const { data } = await requestJson<RawStyleguideResponse>({
		...options,
		path: "web/styleguide",
		query: {
			domain,
			colorScheme: options.colorScheme,
		},
	});

	return {
		domain,
		styleguide: data.styleguide,
		cacheStatus: data.cache_metadata?.status,
		creditsConsumed: data.key_metadata?.credits_consumed,
		creditsRemaining: data.key_metadata?.credits_remaining,
		requestId: data.request_id,
	};
}

/* -------------------------------------------------------------- brand ---- */

export type BrandLookup =
	| { type: "by_domain"; domain: string }
	| { type: "by_name"; name: string }
	| { type: "by_ticker"; ticker: string }
	| { type: "by_email"; email: string };

export interface RetrieveBrandOptions extends ContextDevClientOptions {
	lookup: BrandLookup;
}

export interface RetrieveBrandResult {
	brand: Record<string, unknown> | undefined;
	cacheStatus: string | undefined;
	creditsConsumed: number | undefined;
	creditsRemaining: number | undefined;
	requestId: string | undefined;
}

interface RawBrandResponse extends RawEnvelope {
	brand?: Record<string, unknown>;
}

/** Look up a company profile: logos, colors, descriptions, social links. */
export async function retrieveBrand(
	options: RetrieveBrandOptions,
): Promise<RetrieveBrandResult> {
	const { data } = await requestJson<RawBrandResponse>({
		...options,
		path: "brand/retrieve",
		method: "POST",
		body: options.lookup,
	});

	return {
		brand: data.brand,
		cacheStatus: data.cache_metadata?.status,
		creditsConsumed: data.key_metadata?.credits_consumed,
		creditsRemaining: data.key_metadata?.credits_remaining,
		requestId: data.request_id,
	};
}

/* ------------------------------------------------------------ sitemap ---- */

export interface ScrapeSitemapOptions extends ContextDevClientOptions {
	/** Domain to read public sitemaps from, e.g. "37signals.com". */
	domain: string;
	/** Maximum URLs to return. */
	maxLinks?: number;
	/** Only return URLs matching this regex. */
	urlRegex?: string;
}

export interface ScrapeSitemapResult {
	domain: string;
	urls: string[];
	cacheStatus: string | undefined;
	creditsConsumed: number | undefined;
	creditsRemaining: number | undefined;
	requestId: string | undefined;
}

interface RawSitemapResponse extends RawEnvelope {
	urls?: string[];
}

/** Discover page URLs from a domain's public sitemaps. */
export async function scrapeSitemap(
	options: ScrapeSitemapOptions,
): Promise<ScrapeSitemapResult> {
	const domain = options.domain.trim();
	if (!domain) {
		throw new ContextDevError("scrapeSitemap requires a domain", {
			status: 0,
			retryable: false,
		});
	}

	const { data } = await requestJson<RawSitemapResponse>({
		...options,
		path: "web/scrape/sitemap",
		query: {
			domain,
			maxLinks: options.maxLinks,
			urlRegex: options.urlRegex,
		},
	});

	return {
		domain,
		urls: Array.isArray(data.urls) ? data.urls : [],
		cacheStatus: data.cache_metadata?.status,
		creditsConsumed: data.key_metadata?.credits_consumed,
		creditsRemaining: data.key_metadata?.credits_remaining,
		requestId: data.request_id,
	};
}

/* -------------------------------------------------------------- fonts ---- */

export interface ScrapeFontsOptions extends ContextDevClientOptions {
	/** Domain to inspect, e.g. "37signals.com". */
	domain?: string;
	/** Or a direct page URL to inspect instead of a domain. */
	directUrl?: string;
	/** Return a cached result younger than this. */
	maxAgeMs?: number;
}

export interface ScrapeFontsResult {
	domain: string | undefined;
	fonts: unknown[];
	fontLinks: string[];
	cacheStatus: string | undefined;
	creditsConsumed: number | undefined;
	creditsRemaining: number | undefined;
	requestId: string | undefined;
}

interface RawFontsResponse extends RawEnvelope {
	domain?: string;
	fonts?: unknown[];
	fontLinks?: string[];
}

/** Return a website's font families, usage statistics and font-file URLs. */
export async function scrapeFonts(options: ScrapeFontsOptions): Promise<ScrapeFontsResult> {
	const domain = options.domain?.trim();
	const directUrl = options.directUrl?.trim();
	if (!domain && !directUrl) {
		throw new ContextDevError("scrapeFonts requires a domain or directUrl", {
			status: 0,
			retryable: false,
		});
	}

	const { data } = await requestJson<RawFontsResponse>({
		...options,
		path: "web/fonts",
		query: { domain, directUrl, maxAgeMs: options.maxAgeMs },
		timeoutOpts: { milliseconds: clampTimeout(options.timeoutMs), behavior: "fail" },
	});

	return {
		domain: data.domain ?? domain,
		fonts: Array.isArray(data.fonts) ? data.fonts : [],
		fontLinks: Array.isArray(data.fontLinks) ? data.fontLinks : [],
		cacheStatus: data.cache_metadata?.status,
		creditsConsumed: data.key_metadata?.credits_consumed,
		creditsRemaining: data.key_metadata?.credits_remaining,
		requestId: data.request_id,
	};
}

/* --------------------------------------------------------------- html ---- */

export interface ScrapeHtmlOptions extends ContextDevClientOptions {
	/** Full URL to scrape, including protocol. */
	url: string;
	/** Keep only main content, dropping header/footer/sidebars/nav. */
	useMainContentOnly?: boolean;
	/** Render iframe contents into the HTML. */
	includeFrames?: boolean;
	/** Keep only matching CSS subtrees. */
	includeSelectors?: string[];
	/** Remove matching CSS selectors (takes precedence). */
	excludeSelectors?: string[];
	/** Return a cached result younger than this. */
	maxAgeMs?: number;
	/** Wait this long after load before capturing. Max 30_000. */
	waitForMs?: number;
	/** Wait briefly for CSS/transition animations to settle. */
	settleAnimations?: boolean;
}

export interface ScrapeHtmlResult {
	url: string;
	html: string;
	type: string | undefined;
	extracted: unknown;
	cacheStatus: string | undefined;
	creditsConsumed: number | undefined;
	creditsRemaining: number | undefined;
	requestId: string | undefined;
}

interface RawHtmlResponse extends RawEnvelope {
	html?: string;
	url?: string;
	type?: string;
	extracted?: unknown;
}

/** Return a page's rendered HTML. */
export async function scrapeHtml(options: ScrapeHtmlOptions): Promise<ScrapeHtmlResult> {
	const parsed = validateUrl(options.url);
	const waitForMs =
		options.waitForMs !== undefined ? Math.min(options.waitForMs, MAX_WAIT_FOR_MS) : undefined;
	const timeoutMs =
		waitForMs !== undefined
			? Math.max(clampTimeout(options.timeoutMs), waitForMs + 10_000)
			: clampTimeout(options.timeoutMs);

	const { data } = await requestJson<RawHtmlResponse>({
		...options,
		timeoutMs,
		path: "web/scrape/html",
		query: {
			url: parsed.toString(),
			useMainContentOnly: options.useMainContentOnly,
			includeFrames: options.includeFrames,
			includeSelectors: options.includeSelectors,
			excludeSelectors: options.excludeSelectors,
			maxAgeMs: options.maxAgeMs,
			waitForMs,
			settleAnimations: options.settleAnimations,
			"timeoutOpts[milliseconds]": timeoutMs,
			"timeoutOpts[behavior]": "fail",
		},
	});

	if (typeof data.html !== "string") {
		throw new ContextDevError("Malformed response from Context.dev: missing html", {
			status: 200,
			requestId: data.request_id,
			retryable: false,
		});
	}

	return {
		url: data.url ?? parsed.toString(),
		html: data.html,
		type: data.type,
		extracted: data.extracted,
		cacheStatus: data.cache_metadata?.status,
		creditsConsumed: data.key_metadata?.credits_consumed,
		creditsRemaining: data.key_metadata?.credits_remaining,
		requestId: data.request_id,
	};
}

/* ------------------------------------------------------------- images ---- */

export interface ScrapeImagesOptions extends ContextDevClientOptions {
	/** Full URL to inspect, including protocol. */
	url: string;
	/** Deduplicate returned images. */
	dedupe?: boolean;
	/** Return a cached result younger than this. */
	maxAgeMs?: number;
	/** Wait this long after load before capturing. Max 30_000. */
	waitForMs?: number;
}

export interface ScrapeImagesResult {
	url: string;
	images: unknown[];
	partial: boolean;
	cacheStatus: string | undefined;
	creditsConsumed: number | undefined;
	creditsRemaining: number | undefined;
	requestId: string | undefined;
}

interface RawImagesResponse extends RawEnvelope {
	url?: string;
	images?: unknown[];
	partial?: boolean;
}

/** Find the image assets referenced by a webpage. */
export async function scrapeImages(options: ScrapeImagesOptions): Promise<ScrapeImagesResult> {
	const parsed = validateUrl(options.url);
	const waitForMs =
		options.waitForMs !== undefined ? Math.min(options.waitForMs, MAX_WAIT_FOR_MS) : undefined;
	const timeoutMs =
		waitForMs !== undefined
			? Math.max(clampTimeout(options.timeoutMs), waitForMs + 10_000)
			: clampTimeout(options.timeoutMs);

	const { data } = await requestJson<RawImagesResponse>({
		...options,
		timeoutMs,
		path: "web/scrape/images",
		query: {
			url: parsed.toString(),
			dedupe: options.dedupe,
			maxAgeMs: options.maxAgeMs,
			waitForMs,
			"timeoutOpts[milliseconds]": timeoutMs,
			"timeoutOpts[behavior]": "fail",
		},
	});

	return {
		url: data.url ?? parsed.toString(),
		images: Array.isArray(data.images) ? data.images : [],
		partial: data.partial ?? false,
		cacheStatus: data.cache_metadata?.status,
		creditsConsumed: data.key_metadata?.credits_consumed,
		creditsRemaining: data.key_metadata?.credits_remaining,
		requestId: data.request_id,
	};
}