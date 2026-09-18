/**
 * Load `.env` into `process.env` before any module reads it.
 *
 * Astro/Vite only expose `PUBLIC_`-prefixed vars to `import.meta.env`, and the
 * Notion client reads `process.env`, so without this `npm run dev` / `npm run
 * build` silently fall back to local demo content (no products, no blocks).
 *
 * This module must be imported first in `astro.config.ts`. In CI there is no
 * `.env`, and the workflow env vars are already present, so it is a no-op.
 */
import fs from "node:fs";

const files = [".env", ".env.local"];

for (const file of files) {
	if (!fs.existsSync(file)) continue;

	const contents = fs.readFileSync(file, "utf8");
	for (const rawLine of contents.split(/\r?\n/)) {
		const line = rawLine.trim();
		if (!line || line.startsWith("#")) continue;

		const eq = line.indexOf("=");
		if (eq === -1) continue;

		const key = line.slice(0, eq).trim();
		if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;

		let value = line.slice(eq + 1).trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}

		if (process.env[key] === undefined) {
			process.env[key] = value;
		}
	}
}