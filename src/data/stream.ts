/**
 * Focus Lab stream — the numbered catalog that drives the home page and the
 * detail pages. It uses the numbered `.cluster--index` / `.cluster--signal`
 * layout: newest first, one entry per launch or note.
 */

export interface StreamEntry {
	num: string;
	label: string;
	date: string;
	content: string;
}

export const stream: StreamEntry[] = [
	{
		num: "01",
		label: "Focus Lab is open",
		date: "2026-09-20",
		content:
			"<p>Focus Lab is a product-led studio. We design, build, and run our own software — and we partner with a small number of teams to do the same.</p><p>This is our stream: launches, notes, and the occasional thing we learned the hard way. Newest first.</p>",
	},
	{
		num: "02",
		label: "Product first",
		date: "2026-09-18",
		content:
			"<p>We don't start with a deck. We start with the product.</p><p>Everything we know about shipping comes from owning what we ship, so the first question is always the same: what's the smallest thing worth building, and who is it for?</p>",
	},
	{
		num: "03",
		label: "Why we build our own products",
		date: "2026-09-12",
		content:
			"<p>A studio that only builds for clients learns client lessons. A studio that ships its own products learns product lessons — retention, pricing, support, the second year.</p><p>We build our own first so that when we build yours, we're not guessing.</p>",
	},
	{
		num: "04",
		label: "Shipping is the whole point",
		date: "2026-09-05",
		content:
			"<p>Ideas are cheap. Shipping is the discipline. We keep teams small, cycles short, and scope honest, so the thing actually gets out the door.</p>",
	},
	{
		num: "05",
		label: "Small teams, short cycles",
		date: "2026-08-28",
		content:
			"<p>Small teams move faster and decide better. We keep them small on purpose and give every project a fixed window — because time is the only constraint that forces real trade-offs.</p>",
	},
	{
		num: "06",
		label: "Designing for the second year",
		date: "2026-08-20",
		content:
			"<p>Launch day is the easy part. We design and build for what happens after: support, metrics, and the changes you'll want to make once real people start using it.</p>",
	},
	{
		num: "07",
		label: "AI that survives real users",
		date: "2026-08-12",
		content:
			"<p>Models are easy now. Products aren't. We ship AI with evals, latency and cost budgets, guardrails, and an interface people can trust — not just a demo.</p>",
	},
	{
		num: "08",
		label: "Working in the open",
		date: "2026-08-04",
		content:
			"<p>We write down what we're building and what we got wrong. It keeps us honest, and it's the fastest way for the people we work with to know how we think.</p>",
	},
	{
		num: "09",
		label: "Picking the boring stack",
		date: "2026-07-28",
		content:
			"<p>We choose tools that will still be here in five years: TypeScript, Postgres, Cloudflare, Shopify, Framer. Boring is a feature — it means we spend our attention on the product, not the plumbing.</p>",
	},
	{
		num: "10",
		label: "What we ship first",
		date: "2026-07-20",
		content:
			"<p>The first release is never the whole idea. It's the one slice that proves the idea is worth the rest. We'd rather ship that slice in weeks than the full plan in a year.</p>",
	},
	{
		num: "11",
		label: "The client work we say yes to",
		date: "2026-07-12",
		content:
			"<p>We only take on work where we can be the product team. If we'd be an extra pair of hands on someone else's plan, we're probably not the right fit — and we'll tell you so.</p>",
	},
	{
		num: "12",
		label: "Notes on pricing",
		date: "2026-07-04",
		content:
			"<p>We price the work, not the hours. You get a scope, a number, and a date before we start. If the scope changes, we say so before it becomes a surprise.</p>",
	},
];
