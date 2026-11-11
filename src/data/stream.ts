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
	source?: string;
	url?: string;
	content: string;
}

export const stream: StreamEntry[] = [
	{
		num: "01",
		kind: "note",
		label: "Start here",
		date: "2026-09-22",
		content: `<p>Focus Lab is a product company based in Islamabad, Pakistan. We design, build, and operate our own software: <a href="https://urbanevents.focuslab.pk" target="_blank" rel="noopener">Urban Events</a>, <a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">WorkProof</a>, and <a href="https://fixer.focuslab.pk" target="_blank" rel="noopener">Fixer</a>.</p>
<h2>What you will find here</h2>
<p>Product launches, product updates, and notes on how we work. Each entry is self-contained — you never need the one before it.</p>
<h2>How to read it</h2>
<p>Entries are numbered in order, newest first. Use the previous and next links to move through the stream, or jump anywhere from the index. Every product has a full page here and its own website with complete documentation.</p>`,
	},
	{
		num: "02",
		kind: "note",
		label: "Warp N Woof — luxury women's wear on Shopify",
		date: "2026-11-12",
		content: `<p>Warp N Woof is a Shopify commerce storefront for luxury women's wear in Islamabad — a partner build by Focus Lab. The catalogue spans lawn, ready-to-wear, and 3- and 2-piece sets, with checkout priced and settled in PKR.</p>
<h2>The storefront</h2>
<p>The store is organised around new arrivals and best sellers, with demi couture kurtas from Rs 4,500 and no dollar conversion anywhere in the checkout. Taxes, discounts, and shipping are calculated in PKR at checkout.</p>
<h2>Engagement</h2>
<p>Partner work is delivered on the same terms as our own products: a real problem, a clear owner, and the latitude to decide how to solve it.</p>
<p><a href="https://warp-n-woof.com" target="_blank" rel="noopener">Visit Warp N Woof</a>.</p>`,
	},
	{
		num: "03",
		kind: "note",
		label: "Al Qiyas Movers — a Framer site for a UAE moving company",
		date: "2026-11-04",
		content: `<p>Al Qiyas Movers is a UAE moving company serving homes, villas, and offices across the Emirates. Focus Lab built their website on Framer, centred on a WhatsApp-first lead flow.</p>
<h2>The brief</h2>
<p>Moving is more than transport — it is trusting a team with the things that make a home or keep a business running. The site needed to establish that trust in one screen, then get out of the way.</p>
<h2>WhatsApp-first lead flow</h2>
<p>Every quote starts with a message. The site routes visitors to WhatsApp — call or WhatsApp +971 55 464 6129 — instead of a form, and covers home, apartment, villa, office, and furniture moving with quotes by phone.</p>
<p><a href="https://alqiyasmovers.com" target="_blank" rel="noopener">Visit Al Qiyas Movers</a>.</p>`,
	},
	{
		num: "04",
		kind: "launch",
		label: "Urban Events: PKR checkout, the way Pakistan pays",
		date: "2026-10-20",
		content: `<p>Urban Events, a Focus Lab product, processes event payments the way Pakistan pays: JazzCash, Easypaisa, and bank transfer, all priced and settled in PKR. On paid tickets a simple 5% is added at checkout — no subscriptions, no contracts.</p>
<h2>Payment methods</h2>
<ul>
<li><strong>JazzCash</strong> — Pakistan's most widely used mobile wallet.</li>
<li><strong>Easypaisa</strong> — the second national wallet, equally supported.</li>
<li><strong>Bank transfer</strong> — for organisers moving larger sums.</li>
</ul>
<h2>Pricing model</h2>
<p>Free events cost nothing: Rs 0 forever, with unlimited tickets, a custom event page, and QR check-in. Paid events carry a simple 5% added at checkout and settled in PKR — organisers never pay to list.</p>
<h2>Payouts</h2>
<p>Payouts are processed weekly to the organiser's bank account or mobile wallet, after the event concludes.</p>
<p><a href="https://urbanevents.focuslab.pk/pricing" target="_blank" rel="noopener">See pricing</a>.</p>`,
	},
	{
		num: "05",
		kind: "launch",
		label: "Fixer opens draft PRs for production errors",
		date: "2026-09-21",
		content: `<p>Fixer is Focus Lab's production-error triage product for engineering teams. It connects to the log sources you already use, isolates the exceptions worth human attention, investigates each one against your actual code, and prepares a draft pull request with a root cause, supporting evidence, and a proposed fix.</p>
<h2>How it works</h2>
<ol>
<li><strong>Find</strong> — new errors are surfaced; repeated alerts are not.</li>
<li><strong>Investigate</strong> — the cause and the code involved are traced from the log trail.</li>
<li><strong>Fix</strong> — a proposed fix and test results are prepared for review.</li>
<li><strong>Review</strong> — an engineer approves a draft pull request, creates a ticket, or dismisses the issue.</li>
</ol>
<h2>Governance</h2>
<p>Fixer opens draft pull requests only. No proposed change is pushed before an engineer approves it, and the GitHub App has no merge permission. You review, you merge.</p>
<h2>Bring your own model</h2>
<p>Connect your own provider key — Anthropic, OpenAI, Gemini, OpenRouter, DeepSeek, Groq, and more — and set a daily spend limit. Self-hosted deployment on your own Cloudflare account is also available.</p>
<p><a href="https://fixer.focuslab.pk" target="_blank" rel="noopener">Read more about Fixer</a> or <a href="https://fixer.focuslab.pk/demo" target="_blank" rel="noopener">see the live demo</a>.</p>`,
	},
	{
		num: "06",
		kind: "launch",
		label: "WorkProof: see the work, not the worker",
		date: "2026-09-14",
		content: `<p>WorkProof is Focus Lab's self-hosted workforce analytics product. It measures active vs. idle time, focus ratio, and per-person rollups — computed entirely on the customer's own server, without ever capturing what anyone types, reads, or says.</p>
<h2>What it measures</h2>
<ul>
<li>Active vs. idle time</li>
<li>Focus ratio</li>
<li>Top apps and website domains</li>
<li>Per-person rollups</li>
</ul>
<h2>What it never captures</h2>
<ul>
<li>What anyone types</li>
<li>Passwords or credentials</li>
<li>Message or document contents</li>
<li>Clipboard contents, audio, or microphone</li>
</ul>
<p>Domains, never full URLs. The boundaries are enforced in code, not merely stated in policy.</p>
<p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See WorkProof</a> or <a href="https://workproof.focuslab.pk/demo/" target="_blank" rel="noopener">try the live demo</a>.</p>`,
	},
	{
		num: "07",
		kind: "launch",
		label: "Urban Events: ticketing for Pakistan",
		date: "2026-09-07",
		content: `<p>Urban Events is Focus Lab's ticketing platform for Pakistan. Organisers publish a branded event page, sell tickets in PKR, and check guests in from any phone — a complete event-management workflow without spreadsheets.</p>
<h2>Who it serves</h2>
<p>University MUNs, student society concerts, professional workshops, and community meetups — small to medium-scale organisers across Pakistan. Free events cost nothing: Rs 0 forever.</p>
<h2>How it works</h2>
<ol>
<li><strong>Publish</strong> — a fast, mobile-first event page with your branding, ticket tiers, sale windows, and sold-out states.</li>
<li><strong>Sell tickets</strong> — JazzCash, Easypaisa, and bank transfer, priced in PKR.</li>
<li><strong>Check in</strong> — scan QR codes from any phone; live counts sync across every device at the door.</li>
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
		content: `<p>Focus Lab is a product company first. We design, build, and operate Urban Events, WorkProof, and Fixer — running our own software is how we learn what shipping actually takes: retention, pricing, support, and the second year of a product.</p>
<h2>Why this matters to our customers</h2>
<p>Every product we sell is one we operate ourselves. Support tickets, pricing decisions, and feature trade-offs are informed by running the software in production, not by theory.</p>
<h2>Partner work</h2>
<p>We accept a limited amount of partner work, on the same terms as our own products: a real problem, a clear owner, and the latitude to decide how to solve it. When the fit is not right, we say so early.</p>`,
	},
	{
		num: "09",
		kind: "launch",
		label: "WorkProof: enrolled in under a minute",
		date: "2026-03-03",
		content: `<p>WorkProof enrollment takes under a minute: one command on the laptop and the device appears. No MDM, no accounts to create, and no toolchain to install.</p>
<h2>Enrollment steps</h2>
<ol>
<li><strong>Create a workspace</strong> — the administrator receives an owner key.</li>
<li><strong>Send one command</strong> — the employee pastes it and the device is enrolled.</li>
<li><strong>See the week</strong> — activity appears per person, per device, per day.</li>
</ol>
<p>Supported on macOS and Windows.</p>
<p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See WorkProof</a>.</p>`,
	},
	{
		num: "10",
		kind: "launch",
		label: "Urban Events: QR check-in at the door",
		date: "2026-02-10",
		content: `<p>Every Urban Events ticket carries a unique QR code. At the door, organisers scan from any phone, search a name, and tap — live counts sync across every device, so two volunteers at two doors agree on the number inside.</p>
<h2>Built for the door</h2>
<p>Check-in is fast and reliable, and it functions even with limited connectivity — which is when a check-in line needs it most. Duplicate scans are handled without double-counting.</p>
<p><a href="https://urbanevents.focuslab.pk/features" target="_blank" rel="noopener">See the features</a>.</p>`,
	},
	{
		num: "11",
		kind: "launch",
		label: "Fixer: new issues, not repeated alerts",
		date: "2026-01-06",
		content: `<p>Fixer focuses engineering attention on new issues, not repeated alerts. In a busy window of 18,402 distinct errors, it surfaces the handful that are actually new — and collapses repeats into a single finding.</p>
<h2>One investigation per issue</h2>
<p>“KeyError: 'id' seen 14×” is one review item, not fourteen. Each finding is a single investigation with the code involved, ready for an engineer's decision.</p>
<h2>Follow-up where you already work</h2>
<p>Findings track into GitHub Issues, Jira, Linear, or Azure Boards, and Slack notifications bring them to the team's channel.</p>
<p><a href="https://fixer.focuslab.pk/demo" target="_blank" rel="noopener">See the live demo</a>.</p>`,
	},
	{
		num: "12",
		kind: "launch",
		label: "WorkProof: per-person rollups",
		date: "2025-07-01",
		content: `<p>WorkProof's per-person rollups answer the question every manager asks: where did the week go? Active vs. idle, focus ratio, and per-person totals appear on one screen — per person, per device, per day.</p>
<h2>Computed on your server</h2>
<p>All rollups are computed on the customer's own infrastructure. Nothing is transmitted to Focus Lab; the server is yours, and so is the data.</p>
<p><a href="https://workproof.focuslab.pk/demo/" target="_blank" rel="noopener">Open the live demo</a>.</p>`,
	},
	{
		num: "13",
		kind: "launch",
		label: "Urban Events: live analytics at the door",
		date: "2025-05-27",
		content: `<p>Urban Events provides live analytics for every event: sales, page views, and check-ins as they happen, plus daily reports and CSV exports — so the numbers after the event match the numbers at the door.</p>
<h2>Live during the campaign</h2>
<p>Sales and page views update in real time; check-ins update live at the door. When a ticket block is selling fast, organisers see it in time to act.</p>
<h2>Reporting</h2>
<p>Daily reports keep the organising team informed, and CSV exports provide the raw figures for accounts and reconciliation.</p>
<p><a href="https://urbanevents.focuslab.pk/features" target="_blank" rel="noopener">See the features</a>.</p>`,
	},
	{
		num: "14",
		kind: "note",
		label: "We are a studio, not an agency",
		date: "2025-04-29",
		content: `<p>Partner work at Focus Lab is delivered on the same terms as our own products: a real problem, a clear owner, and the latitude to decide how to solve it. We would rather decline early than deliver work we do not stand behind.</p>
<h2>How we differ from an agency</h2>
<p>An agency delivers what the brief says. We deliver what solves the problem — which sometimes means telling you the brief is asking the wrong question. When we are not the right fit, we say so in the first reply, not the third.</p>`,
	},
	{
		num: "15",
		kind: "launch",
		label: "Fixer: evidence before the fix",
		date: "2025-04-15",
		content: `<p>Every Fixer investigation opens with the evidence: what went wrong, the code involved, and the log trail — not a link to a dashboard.</p>
<h2>What a finding looks like</h2>
<p>A proposed fix with the evidence behind it: the log lines, the file and line involved — recommendation_server.py:64, say — and a diff an engineer can actually read.</p>
<h2>Engineer in the loop</h2>
<p>The diagnosis, log trail, and test commands are reviewed before any decision. An engineer approves a draft pull request, creates a ticket, or dismisses the issue — nothing ships without that call.</p>
<p><a href="https://fixer.focuslab.pk/demo" target="_blank" rel="noopener">See the live demo</a>.</p>`,
	},
	{
		num: "16",
		kind: "launch",
		label: "WorkProof: the whole story is local",
		date: "2025-03-11",
		content: `<p>WorkProof self-hosted runs on the customer's own infrastructure — Postgres, storage, server-side policies, screenshots, and audit log. Your data never leaves your environment.</p>
<h2>Deployment model</h2>
<p>You run it, on your own infrastructure, under a signed license key. Your Postgres holds the data, your storage holds the screenshots, and your mail relay sends the reports.</p>
<h2>Licensing</h2>
<p>Pricing is on request, per person, billed annually. You are the customer, not the product — activity data stays yours either way.</p>
<p><a href="https://workproof.focuslab.pk/security/" target="_blank" rel="noopener">See the security model</a>.</p>`,
	},
	{
		num: "17",
		kind: "launch",
		label: "Fixer: no merge permission, still",
		date: "2024-11-19",
		content: `<p>Fixer opens draft pull requests. It cannot merge, and no code path grants it merge permission — no proposed change is pushed before an engineer approves it.</p>
<h2>The constraint is the product</h2>
<p>Human approval before changes is not a limitation we work around; it is the product. Fixer can propose, but only an engineer can ship.</p>
<h2>Staying in control</h2>
<p>Connect your own model key, set a daily spend limit, and approve what reaches your repository. The diagnosis, log trail, and test commands are reviewed before every decision.</p>
<p><a href="https://fixer.focuslab.pk" target="_blank" rel="noopener">Read more about Fixer</a>.</p>`,
	},
];


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

	let text = paragraphs[0]!;
	for (let i = 1; i < paragraphs.length && text.length < 90; i++) {
		const next = `${text} ${paragraphs[i]}`;
		if (next.length > max) break;
		text = next;
	}

	if (text.length <= max) return text;

	const cut = text.slice(0, max);
	const lastSpace = cut.lastIndexOf(" ");
	const trimmed = (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut)
		.replace(/[\s,;:—–-]+(?:and|or|but|which|that|with|for|to|a|an|the|in|on|at|is|are)$/i, "")
		.replace(/[.,;:]$/, "");
	return `${trimmed}…`;
}
