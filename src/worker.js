import {
	scrapeMarkdown,
	extractStyleguide,
	retrieveBrand,
	scrapeSitemap,
	scrapeFonts,
	ContextDevError,
} from "./lib/context-dev.ts";

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };

function json(body, status = 200) {
	return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

const SCHEMES = new Set(["light", "dark", "system"]);

/**
 * Server-side Context.dev proxy. Disabled unless ENABLE_CONTEXT_API === "true".
 * Optionally protected by CONTEXT_API_TOKEN (Authorization: Bearer <token>).
 * The API key stays on the server; the browser never sees it.
 */
async function handleContextApi(request, env) {
	if (env.ENABLE_CONTEXT_API !== "true") {
		return json({ error: "Context API endpoint is disabled." }, 404);
	}
	if (!env.CONTEXT_DEV_API_KEY) {
		return json({ error: "CONTEXT_DEV_API_KEY is not configured." }, 500);
	}
	if (env.CONTEXT_API_TOKEN) {
		const provided = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
		if (provided !== env.CONTEXT_API_TOKEN) {
			return json({ error: "Unauthorized." }, 401);
		}
	}

	const url = new URL(request.url);
	const action = url.pathname.replace(/^\/api\/context\/?/, "");
	const apiKey = env.CONTEXT_DEV_API_KEY;
	const target = url.searchParams.get("url") || undefined;
	const domain = url.searchParams.get("domain") || undefined;
	const schemeParam = url.searchParams.get("colorScheme") || undefined;

	try {
		switch (action) {
			case "markdown": {
				if (!target) return json({ error: "url is required" }, 400);
				return json(await scrapeMarkdown(target, { apiKey, useMainContentOnly: true }));
			}
			case "styleguide": {
				if (!domain) return json({ error: "domain is required" }, 400);
				return json(
					await extractStyleguide({
						domain,
						apiKey,
						colorScheme: schemeParam && SCHEMES.has(schemeParam) ? schemeParam : undefined,
					}),
				);
			}
			case "brand": {
				if (!domain) return json({ error: "domain is required" }, 400);
				return json(await retrieveBrand({ apiKey, lookup: { type: "by_domain", domain } }));
			}
			case "sitemap": {
				if (!domain) return json({ error: "domain is required" }, 400);
				const maxLinks = url.searchParams.get("maxLinks");
				return json(
					await scrapeSitemap({
						domain,
						apiKey,
						maxLinks: maxLinks ? Number(maxLinks) : undefined,
					}),
				);
			}
			case "fonts": {
				if (!domain) return json({ error: "domain is required" }, 400);
				return json(await scrapeFonts({ domain, apiKey }));
			}
			default:
				return json(
					{
						error: "Unknown action",
						actions: ["markdown", "styleguide", "brand", "sitemap", "fonts"],
					},
					404,
				);
		}
	} catch (error) {
		if (error instanceof ContextDevError) {
			const status = error.status >= 400 && error.status < 600 ? error.status : 502;
			return json(
				{ error: error.message, code: error.code ?? null, requestId: error.requestId ?? null },
				status,
			);
		}
		return json({ error: "Unexpected error handling Context.dev request." }, 500);
	}
}

/**
 * Baseline security headers. HSTS is deliberately *not* includeSubDomains:
 * focuslab.pk has DNS-only subdomains (mail, sip, lyncdiscover) that must not
 * be forced onto HTTPS.
 */
function withSecurityHeaders(response) {
	const headers = new Headers(response.headers);
	headers.set("Strict-Transport-Security", "max-age=31536000");
	headers.set("X-Content-Type-Options", "nosniff");
	headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
	headers.set("X-Frame-Options", "SAMEORIGIN");
	headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		// Canonical host: send www.focuslab.pk to the apex.
		if (url.hostname.startsWith("www.")) {
			url.hostname = url.hostname.slice(4);
			return Response.redirect(url.toString(), 301);
		}

		if (url.pathname === "/api/context" || url.pathname.startsWith("/api/context/")) {
			return handleContextApi(request, env);
		}

		return withSecurityHeaders(await env.ASSETS.fetch(request));
	},
};
