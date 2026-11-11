/**
 * The Focus Lab stream.
 *
 * A feed, not a blog. Each entry is self-contained and can be anything we
 * want to put in front of people: a note, a launch, a link, a quote, or a
 * piece of writing we found useful. Curated entries carry their source and a
 * link to the original; our own entries stand on their own.
 *
 * The stream drives /stream, the homepage feed, and every /NN page.
 */

export type StreamKind = "note" | "launch";

export const streamKindLabels: Record<StreamKind, string> = {
	note: "Note",
	launch: "Launch",
};

export interface StreamEntry {
	num: string;
	kind: StreamKind;
	label: string;
	date: string;
	/** Author or publication, for curated entries. */
	source?: string;
	/** Link to the original, for curated entries. */
	url?: string;
	content: string;
}

export const stream: StreamEntry[] = [
	{
		num: "01",
		kind: "note",
		label: "Start here",
		date: "2026-09-22",
		content: `<p>Notes and launches from the Focus Lab studio. We are a product studio in Islamabad. We build and run our own software: Urban Events, WorkProof, and Fixer.</p><p>Use the previous and next links to move through the stream, or wander through the archive in any order.</p>`,
	},
	{
		num: "02",
		kind: "note",
		label: "Warp N Woof — luxury women's wear on Shopify",
		date: "2026-11-12",
		content: `<p>Warp N Woof is a Shopify store for luxury women's wear in Islamabad — lawn, ready-to-wear, and 3- and 2-piece, priced in PKR.</p><p>We built it around their new arrivals and best sellers, with rupee checkout and a catalog that keeps up with each restock. Partner work, on the same terms as our own products.</p><p><a href="https://warp-n-woof.com" target="_blank" rel="noopener">Visit Warp N Woof</a>.</p>`,
	},
	{
		num: "03",
		kind: "note",
		label: "Al Qiyas Movers — a Framer site for a UAE moving company",
		date: "2026-11-04",
		content: `<p>Al Qiyas Movers moves homes, villas, and offices across the UAE. Their site is a Framer build: services, service area, and a WhatsApp quote on every screen.</p><p>For a business that runs on phone calls, the job was a page that turns a visit into a WhatsApp message — call or WhatsApp +971 55 464 6129.</p><p><a href="https://alqiyasmovers.com" target="_blank" rel="noopener">Visit Al Qiyas Movers</a>.</p>`,
	},
	{
		num: "04",
		kind: "launch",
		label: "Urban Events: PKR checkout, the way Pakistan pays",
		date: "2026-10-20",
		content: `<p>Urban Events sells tickets the way Pakistan pays: JazzCash, Easypaisa, and bank transfer, priced in PKR with no dollar surprises. On paid tickets a simple 5% is added at checkout and settled in PKR.</p><p>Payouts are processed weekly to your bank account or mobile wallet. No subscriptions, no contracts — free events stay free.</p><p><a href="https://urbanevents.focuslab.pk/pricing" target="_blank" rel="noopener">See pricing</a>.</p>`,
	},
	{
		num: "05",
		kind: "launch",
		label: "Fixer opens draft PRs for production errors",
		date: "2026-09-21",
		content: `<p>Fixer takes production logs and turns them into draft pull requests: it finds the cause of production errors, investigates each one against your code, and proposes a fix.</p><p>Fixer opens draft pull requests only. No proposed change is pushed before you approve it — you review, you merge. Bring your own model key, or run Fixer self-hosted on your own Cloudflare account.</p><p><a href="https://fixer.focuslab.pk" target="_blank" rel="noopener">Read more about Fixer</a> or <a href="https://fixer.focuslab.pk/demo" target="_blank" rel="noopener">see the live demo</a>.</p>`,
	},
	{
		num: "06",
		kind: "launch",
		label: "WorkProof: see the work, not the worker",
		date: "2026-09-14",
		content: `<p>WorkProof is self-hosted workforce analytics: active vs. idle time, top apps, and domains, computed on your own server — without ever capturing what anyone types, reads, or says.</p><p>Zero keystrokes captured. Your Postgres and storage, server-side policies, screenshots opt-in, and an audit log. Domains, never full URLs.</p><p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See WorkProof</a> or <a href="https://workproof.focuslab.pk/demo/" target="_blank" rel="noopener">try the live demo</a>.</p>`,
	},
	{
		num: "07",
		kind: "launch",
		label: "Urban Events: ticketing for Pakistan",
		date: "2026-09-07",
		content: `<p>Urban Events lets organizers publish a polished event page, sell tickets in PKR, and check guests in from any phone. Built for student societies, MUNs, workshops, and meetups across Pakistan.</p><p>Free for free events, forever. On paid tickets a simple 5% is added at checkout — no monthly fees, no contracts.</p><p><a href="https://urbanevents.focuslab.pk" target="_blank" rel="noopener">Start an event</a>.</p>`,
	},
	{
		num: "08",
		kind: "note",
		label: "Products first, partners occasionally",
		date: "2026-08-24",
		content: `<p>We are products first. Running our own software is how we learn what shipping actually takes — retention, pricing, support, the second year.</p><p>Once in a while we take on a partner when there is a mutual fit: a real problem, a clear owner, and room to decide how to solve it. If we are not the right fit, we say so early.</p>`,
	},
	{
		num: "09",
		kind: "launch",
		label: "WorkProof: enrolled in under a minute",
		date: "2026-03-03",
		content: `<p>WorkProof enrollment takes under a minute: one command on the laptop and the device appears. No MDM, no accounts to create.</p><p>Create a workspace, get an owner key, send one command, and see the week — per person, per device, per day.</p><p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See WorkProof</a>.</p>`,
	},
	{
		num: "10",
		kind: "launch",
		label: "Urban Events: QR check-in at the door",
		date: "2026-02-10",
		content: `<p>Every ticket comes with a unique QR code. At the door you scan from any phone, search a name and tap, and live counts sync across every device.</p><p>It is fast and reliable, and it works even with spotty internet.</p><p><a href="https://urbanevents.focuslab.pk/features" target="_blank" rel="noopener">See the features</a>.</p>`,
	},
	{
		num: "11",
		kind: "launch",
		label: "Fixer: new issues, not repeated alerts",
		date: "2026-01-06",
		content: `<p>Fixer catches new errors and focuses on new issues, not repeated alerts — 18,402 distinct errors in a window become the handful that are actually new.</p><p>Each finding is one investigation with the code involved, and follow-up work can be tracked in GitHub Issues, Jira, Linear, or Azure Boards.</p><p><a href="https://fixer.focuslab.pk/demo" target="_blank" rel="noopener">See the live demo</a>.</p>`,
	},
	{
		num: "12",
		kind: "launch",
		label: "WorkProof: per-person rollups",
		date: "2025-07-01",
		content: `<p>WorkProof shows active vs. idle, focus ratio, and per-person rollups — the whole picture on one screen, per person, per device, per day.</p><p>Computed on your own server. See it live in the demo.</p><p><a href="https://workproof.focuslab.pk/demo/" target="_blank" rel="noopener">Open the live demo</a>.</p>`,
	},
	{
		num: "13",
		kind: "launch",
		label: "Urban Events: live analytics at the door",
		date: "2025-05-27",
		content: `<p>Sales, page views, and check-ins as they happen — plus daily reports and CSV exports, so the numbers after the event match the numbers at the door.</p><p><a href="https://urbanevents.focuslab.pk/features" target="_blank" rel="noopener">See the features</a>.</p>`,
	},
	{
		num: "14",
		kind: "note",
		label: "We are a studio, not an agency",
		date: "2025-04-29",
		content: `<p>When we do take on partner work, it is on the same terms as our own products: a real problem, a clear owner, and enough room to decide how to solve it. If we are not the right fit we say so in the first reply, not the third.</p><p>Being paid to be unhelpful is a bad way to spend a year.</p>`,
	},
	{
		num: "15",
		kind: "launch",
		label: "Fixer: evidence before the fix",
		date: "2025-04-15",
		content: `<p>Every investigation opens with the evidence: what went wrong, the code involved, and the log trail — not a link to a dashboard.</p><p>Review the diagnosis, log trail, and test commands before deciding. Approve a draft pull request, create a ticket, or dismiss the issue.</p><p><a href="https://fixer.focuslab.pk/demo" target="_blank" rel="noopener">See the live demo</a>.</p>`,
	},
	{
		num: "16",
		kind: "launch",
		label: "WorkProof: the whole story is local",
		date: "2025-03-11",
		content: `<p>WorkProof self-hosted runs on your own infrastructure — your Postgres and storage, server-side policies, screenshots and audit log. Your data never leaves.</p><p>Pricing on request, per person, billed annually. You are the customer, not the product.</p><p><a href="https://workproof.focuslab.pk/security/" target="_blank" rel="noopener">See the security model</a>.</p>`,
	},
	{
		num: "17",
		kind: "launch",
		label: "Fixer: no merge permission, still",
		date: "2024-11-19",
		content: `<p>Fixer opens draft pull requests. You decide what ships — no proposed change is pushed before you approve it, and human approval is required before changes.</p><p>Bring your own model key, set a spend limit, and approve what reaches your repository.</p><p><a href="https://fixer.focuslab.pk" target="_blank" rel="noopener">Read more about Fixer</a>.</p>`,
	},
];


/**
 * A meta description for a stream entry, derived from its own body.
 *
 * The label alone made a useless description — "We keep a list of things we
 * are not doing" is a title, not a summary, and search engines were getting
 * that and nothing else on a hundred pages.
 *
 * The unit is the opening paragraph, not the first sentence. A lot of these
 * entries open short and punchy — "It sits next to the roadmap and it is
 * longer." — which reads badly as a standalone snippet because the point only
 * arrives in the second paragraph. So: take the first paragraph, and if it is
 * too thin to stand alone, add the next one.
 *
 * Capped at 155 characters because that is roughly where Google truncates, and
 * a clean word-boundary cut is better than a mid-word one.
 */
export function entryDescription(entry: StreamEntry, max = 155): string {
	const paragraphs = entry.content
		.split(/<\/p>/i)
		.map((part) =>
			part
				.replace(/<[^>]*>/g, " ")
				.replace(/&(?:amp|nbsp|lt|gt|quot|#39);/g, " ")
				.replace(/\s+/g, " ")
				.trim(),
		)
		.filter(Boolean);

	if (paragraphs.length === 0) return entry.label;

	// Add paragraphs until there is enough to say something, or we run out.
	let text = paragraphs[0]!;
	for (let i = 1; i < paragraphs.length && text.length < 90; i++) {
		const next = `${text} ${paragraphs[i]}`;
		// Do not overshoot the cap just to clear the thinness threshold.
		if (next.length > max) break;
		text = next;
	}

	if (text.length <= max) return text;

	const cut = text.slice(0, max);
	const lastSpace = cut.lastIndexOf(" ");
	const trimmed = (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut)
		// Drop the dangling conjunction a mid-sentence cut leaves behind.
		.replace(/[\s,;:—–-]+(?:and|or|but|which|that|with|for|to|a|an|the|in|on|at|is|are)$/i, "")
		.replace(/[.,;:]$/, "");
	return `${trimmed}…`;
}
