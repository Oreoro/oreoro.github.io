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
		content: `<p>Notes and launches from the Focus Lab studio. We are a product studio in Islamabad. We build and run our own software: Urban Events, WorkProof, and Fixer.</p>
<h2>What you will find here</h2>
<p>Launches of the products we run, notes on how we work, and the occasional partner build. Each entry is self-contained — you never need the one before it.</p>
<h2>How to read it</h2>
<p>Entries are numbered in order, newest first. Use the previous and next links to move through the stream, or jump anywhere from the index. The products live at their own sites: <a href="https://urbanevents.focuslab.pk" target="_blank" rel="noopener">Urban Events</a>, <a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">WorkProof</a>, and <a href="https://fixer.focuslab.pk" target="_blank" rel="noopener">Fixer</a>.</p>`,
	},
	{
		num: "02",
		kind: "note",
		label: "Warp N Woof — luxury women's wear on Shopify",
		date: "2026-11-12",
		content: `<p>Warp N Woof is a Shopify store for luxury women's wear in Islamabad — lawn, ready-to-wear, and 3- and 2-piece, priced in PKR.</p>
<h2>The store</h2>
<p>Collections are the usual suspects, done properly: new arrivals, best sellers, ready to wear, 3-piece, 2-piece, and lawn — each with its own page, from 1-piece sets to tailored cambric. The catalog runs on Shopify, so the shop side stays boring and reliable while the brand does the talking.</p>
<h2>Rupee checkout</h2>
<p>The checkout estimates totals in PKR, with taxes, discounts, and shipping calculated at checkout. Demi couture restocks like the KARA kurta list at Rs 4,500 — no dollar surprises on a Pakistani price tag.</p>
<h2>Partner work</h2>
<p>We built the store on the same terms as our own products: a real problem, a clear owner, and room to decide how to solve it.</p>
<p><a href="https://warp-n-woof.com" target="_blank" rel="noopener">Visit Warp N Woof</a>.</p>`,
	},
	{
		num: "03",
		kind: "note",
		label: "Al Qiyas Movers — a Framer site for a UAE moving company",
		date: "2026-11-04",
		content: `<p>Al Qiyas Movers moves homes, villas, and offices across the UAE. Their site is a Framer build: services, service area, and a WhatsApp quote on every screen.</p>
<h2>The brief</h2>
<p>Moving is more than transport — it is trusting a team with the things that make a home or keep a business running. The site has to say that in one screen, then get out of the way.</p>
<h2>WhatsApp-first</h2>
<p>Every quote starts with a message. The site puts “Call or WhatsApp +971 55 464 6129” on every screen and routes visitors to a WhatsApp quote instead of a form nobody fills in.</p>
<h2>Services</h2>
<p>Home and apartment moving, villa moving, office moving, and furniture moving — a clear plan from collection to delivery, with quotes by phone.</p>
<p><a href="https://alqiyasmovers.com" target="_blank" rel="noopener">Visit Al Qiyas Movers</a>.</p>`,
	},
	{
		num: "04",
		kind: "launch",
		label: "Urban Events: PKR checkout, the way Pakistan pays",
		date: "2026-10-20",
		content: `<p>Urban Events sells tickets the way Pakistan pays: JazzCash, Easypaisa, and bank transfer, priced in PKR with no dollar surprises. On paid tickets a simple 5% is added at checkout and settled in PKR.</p>
<h2>The payment rails</h2>
<ul>
<li><strong>JazzCash</strong> — the wallet everyone already has.</li>
<li><strong>Easypaisa</strong> — same story, different pocket.</li>
<li><strong>Bank transfer</strong> — for the organizers who move bigger sums.</li>
</ul>
<p>Attendees pay the way Pakistan pays. No international gateway, no dollar conversion, no surprises on the ticket price.</p>
<h2>Fees</h2>
<p>Free events stay free: Rs 0 forever, no listing costs, no platform fees. On paid tickets a simple 5% is added at checkout — you never pay to list.</p>
<h2>Payouts</h2>
<p>Payouts are processed weekly to your bank account or mobile wallet. No subscriptions, no contracts.</p>
<p><a href="https://urbanevents.focuslab.pk/pricing" target="_blank" rel="noopener">See pricing</a>.</p>`,
	},
	{
		num: "05",
		kind: "launch",
		label: "Fixer opens draft PRs for production errors",
		date: "2026-09-21",
		content: `<p>Fixer takes production logs and turns them into draft pull requests: it finds the cause of production errors, investigates each one against your code, and proposes a fix.</p>
<h2>How it works</h2>
<ol>
<li><strong>Find</strong> — catch new errors and focus on new issues, not repeated alerts.</li>
<li><strong>Investigate</strong> — see what went wrong and the code involved.</li>
<li><strong>Fix</strong> — review the proposed fix and the test results.</li>
<li><strong>Review</strong> — approve a draft pull request, create a ticket, or dismiss the issue.</li>
</ol>
<h2>You decide what ships</h2>
<p>Fixer opens draft pull requests only. No proposed change is pushed before you approve it — you review, you merge. The GitHub App has no merge permission, and no code path calls one.</p>
<h2>Bring your own model</h2>
<p>Choose a provider — Anthropic, OpenAI, Gemini, OpenRouter, DeepSeek, Groq, and more — add your key, and set a spend limit. Or run Fixer self-hosted on your own Cloudflare account.</p>
<p><a href="https://fixer.focuslab.pk" target="_blank" rel="noopener">Read more about Fixer</a> or <a href="https://fixer.focuslab.pk/demo" target="_blank" rel="noopener">see the live demo</a>.</p>`,
	},
	{
		num: "06",
		kind: "launch",
		label: "WorkProof: see the work, not the worker",
		date: "2026-09-14",
		content: `<p>WorkProof is self-hosted workforce analytics: active vs. idle time, top apps, and domains, computed on your own server — without ever capturing what anyone types, reads, or says.</p>
<h2>What it shows</h2>
<ul>
<li>Active vs. idle time</li>
<li>Focus ratio</li>
<li>Top apps and website domains</li>
<li>Per-person rollups</li>
</ul>
<p>The whole picture on one screen, per person, per device, per day.</p>
<h2>What it never captures</h2>
<ul>
<li>What anyone types</li>
<li>Passwords or credentials</li>
<li>Message or document contents</li>
<li>Clipboard contents, audio, or microphone</li>
</ul>
<p>Domains, never full URLs. Counts, not content: it records that you typed, never what you typed. The boundaries are written into the code, not just the policy.</p>
<p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See WorkProof</a> or <a href="https://workproof.focuslab.pk/demo/" target="_blank" rel="noopener">try the live demo</a>.</p>`,
	},
	{
		num: "07",
		kind: "launch",
		label: "Urban Events: ticketing for Pakistan",
		date: "2026-09-07",
		content: `<p>Urban Events lets organizers publish a polished event page, sell tickets in PKR, and check guests in from any phone. Built for student societies, MUNs, workshops, and meetups across Pakistan.</p>
<h2>Who it is for</h2>
<p>University MUNs, student society concerts, professional workshops, and community meetups — small to medium-scale organizers who are tired of spreadsheets. If you host free events, it costs nothing: Rs 0 forever.</p>
<h2>How it works</h2>
<ol>
<li><strong>Publish</strong> — a fast event page with your branding, live before your chai goes cold.</li>
<li><strong>Sell tickets</strong> — JazzCash, Easypaisa, and bank transfer, priced in PKR.</li>
<li><strong>Check in</strong> — scan QR codes from any phone and watch counts sync live at the door.</li>
</ol>
<h2>Pricing</h2>
<p>Free for free events, forever. On paid tickets a simple 5% is added at checkout — no monthly fees, no contracts.</p>
<p><a href="https://urbanevents.focuslab.pk" target="_blank" rel="noopener">Start an event</a>.</p>`,
	},
	{
		num: "08",
		kind: "note",
		label: "Products first, partners occasionally",
		date: "2026-08-24",
		content: `<p>We are products first. Running our own software is how we learn what shipping actually takes — retention, pricing, support, the second year.</p>
<h2>Why products first</h2>
<p>A partner asks for what they want today. A product has to survive the second year, which means pricing, support, and saying no. Running our own software teaches us the second year, over and over.</p>
<h2>When we say yes</h2>
<p>Once in a while we take on a partner when there is a mutual fit: a real problem, a clear owner, and room to decide how to solve it. If we are not the right fit, we say so early.</p>`,
	},
	{
		num: "09",
		kind: "launch",
		label: "WorkProof: enrolled in under a minute",
		date: "2026-03-03",
		content: `<p>WorkProof enrollment takes under a minute: one command on the laptop and the device appears. No MDM, no accounts to create.</p>
<h2>Three steps</h2>
<ol>
<li><strong>Create a workspace</strong> — get an owner key.</li>
<li><strong>Send one command</strong> — they paste it and are enrolled.</li>
<li><strong>See the week</strong> — per person, per device, per day.</li>
</ol>
<p>No MDM profile, no manual setup, no Rust toolchain. macOS and Windows.</p>
<p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See WorkProof</a>.</p>`,
	},
	{
		num: "10",
		kind: "launch",
		label: "Urban Events: QR check-in at the door",
		date: "2026-02-10",
		content: `<p>Every ticket comes with a unique QR code. At the door you scan from any phone, search a name and tap, and live counts sync across every device.</p>
<h2>At the door</h2>
<p>Scan from any phone, search a name and tap. Counts sync live across every device, so two volunteers at two doors agree on the number inside.</p>
<h2>Works with spotty internet</h2>
<p>It is fast and reliable, and it works even with spotty internet — which, in practice, is when you need it most.</p>
<p><a href="https://urbanevents.focuslab.pk/features" target="_blank" rel="noopener">See the features</a>.</p>`,
	},
	{
		num: "11",
		kind: "launch",
		label: "Fixer: new issues, not repeated alerts",
		date: "2026-01-06",
		content: `<p>Fixer catches new errors and focuses on new issues, not repeated alerts. A busy window of 18,402 distinct errors becomes the handful that are actually new.</p>
<h2>One investigation per issue</h2>
<p>Repeated alerts collapse into one finding: “KeyError: 'id' seen 14×” is one review item, not fourteen. Each finding is one investigation with the code involved.</p>
<h2>Follow-up where you already work</h2>
<p>Findings can be tracked in GitHub Issues, Jira, Linear, or Azure Boards, and Slack notifications bring them to your team's channel.</p>
<p><a href="https://fixer.focuslab.pk/demo" target="_blank" rel="noopener">See the live demo</a>.</p>`,
	},
	{
		num: "12",
		kind: "launch",
		label: "WorkProof: per-person rollups",
		date: "2025-07-01",
		content: `<p>WorkProof shows active vs. idle, focus ratio, and per-person rollups — the whole picture on one screen, per person, per device, per day.</p>
<h2>The week at a glance</h2>
<p>Rollups answer the question that started the product: where did the week go? Active vs. idle, focus ratio, and per-person totals, all computed on your own server.</p>
<p>Nothing is sent to us — the server is yours, and so is the data.</p>
<p><a href="https://workproof.focuslab.pk/demo/" target="_blank" rel="noopener">Open the live demo</a>.</p>`,
	},
	{
		num: "13",
		kind: "launch",
		label: "Urban Events: live analytics at the door",
		date: "2025-05-27",
		content: `<p>Sales, page views, and check-ins as they happen — plus daily reports and CSV exports, so the numbers after the event match the numbers at the door.</p>
<h2>As they happen</h2>
<p>Sales and page views update live during the campaign; check-ins update live at the door. If a ticket block is selling fast, you see it in time to act.</p>
<h2>Reports and exports</h2>
<p>Daily reports keep the organizing team in the loop, and CSV exports give you the raw numbers for the society's accounts.</p>
<p><a href="https://urbanevents.focuslab.pk/features" target="_blank" rel="noopener">See the features</a>.</p>`,
	},
	{
		num: "14",
		kind: "note",
		label: "We are a studio, not an agency",
		date: "2025-04-29",
		content: `<p>When we do take on partner work, it is on the same terms as our own products: a real problem, a clear owner, and enough room to decide how to solve it.</p>
<h2>The difference</h2>
<p>An agency delivers what the brief says. A studio has opinions: we will tell you when the brief is asking the wrong question, and we would rather say no early than be paid to be unhelpful.</p>
<h2>Same terms as our own products</h2>
<p>If we are not the right fit, we say so in the first reply, not the third. Being paid to be unhelpful is a bad way to spend a year.</p>`,
	},
	{
		num: "15",
		kind: "launch",
		label: "Fixer: evidence before the fix",
		date: "2025-04-15",
		content: `<p>Every investigation opens with the evidence: what went wrong, the code involved, and the log trail — not a link to a dashboard.</p>
<h2>What a finding looks like</h2>
<p>A proposed fix with the evidence behind it: the log lines, the file and line involved — recommendation_server.py:64, say — and a diff you can actually read.</p>
<h2>Before you decide</h2>
<p>Review the diagnosis, log trail, and test commands before deciding. Approve a draft pull request, create a ticket, or dismiss the issue — nothing ships without your call.</p>
<p><a href="https://fixer.focuslab.pk/demo" target="_blank" rel="noopener">See the live demo</a>.</p>`,
	},
	{
		num: "16",
		kind: "launch",
		label: "WorkProof: the whole story is local",
		date: "2025-03-11",
		content: `<p>WorkProof self-hosted runs on your own infrastructure — your Postgres and storage, server-side policies, screenshots and audit log. Your data never leaves.</p>
<h2>Who runs what</h2>
<p>You run it, on your own infrastructure, with a signed license key. Your Postgres holds the data, your storage holds the screenshots, and your mail relay sends the reports.</p>
<h2>Pricing</h2>
<p>Pricing on request, per person, billed annually. You are the customer, not the product — activity data stays yours either way.</p>
<p><a href="https://workproof.focuslab.pk/security/" target="_blank" rel="noopener">See the security model</a>.</p>`,
	},
	{
		num: "17",
		kind: "launch",
		label: "Fixer: no merge permission, still",
		date: "2024-11-19",
		content: `<p>Fixer opens draft pull requests. You decide what ships — no proposed change is pushed before you approve it, and human approval is required before changes.</p>
<h2>The constraint is the product</h2>
<p>The GitHub App has no merge permission, and no code path could give it one. Fixer can propose, but only a person can ship. That is not a limitation we work around; it is the point.</p>
<h2>Staying in control</h2>
<p>Bring your own model key, set a spend limit, and approve what reaches your repository. Review the diagnosis, log trail, and test commands before deciding.</p>
<p><a href="https://fixer.focuslab.pk" target="_blank" rel="noopener">Read more about Fixer</a>.</p>`,
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
