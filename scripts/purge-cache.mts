/**
 * Purge the Cloudflare edge cache for focuslab.pk after a deploy.
 *
 * Static assets are content-hashed and HTML is served `max-age=0,
 * must-revalidate`, so a purge is usually unnecessary — but it makes a deploy
 * feel instant and clears any stale HTML from an older worker.
 *
 * Reads CLOUDFLARE_API_TOKEN (required to actually purge) and
 * CLOUDFLARE_ZONE_ID (defaults to the focuslab.pk zone). Skips cleanly when no
 * token is present, so it is safe to run in any environment.
 */

const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID ?? "d279ba9bbf7eacaf0530c6a7ae43118b";
const TOKEN = process.env.CLOUDFLARE_API_TOKEN ?? "";

if (!TOKEN) {
	console.log("[purge] CLOUDFLARE_API_TOKEN not set — skipping cache purge.");
	process.exit(0);
}

const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`, {
	method: "POST",
	headers: {
		Authorization: `Bearer ${TOKEN}`,
		"Content-Type": "application/json",
	},
	body: JSON.stringify({ purge_everything: true }),
});

const result = (await response.json()) as {
	success?: boolean;
	errors?: { code: number; message: string }[];
};

if (!response.ok || !result.success) {
	console.error("[purge] Failed:", result.errors ?? response.statusText);
	process.exit(1);
}

console.log("[purge] focuslab.pk cache purged.");
