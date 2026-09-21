/**
 * The Focus Lab stream.
 *
 * A feed, not a blog. Each entry is self-contained and can be anything we
 * want to put in front of people: a note, a launch, a link, a quote, or a
 * piece of writing we found useful. Curated entries carry their source and a
 * link to the original; our own entries stand on their own.
 *
 * The stream drives the home page (`.cluster--index`) and every `/NN` page.
 */

export type StreamKind = "note" | "launch" | "essay" | "quote" | "link";

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
		num: "00",
		kind: "note",
		label: "Start here",
		date: "2026-09-22",
		content: `<p>Welcome. This is the Focus Lab stream — a feed of the things we are building, reading, and thinking about. We are a product studio in Islamabad. We design, build, and run our own software, and once in a while we partner with a team when the fit is right.</p><p>Some entries are ours: launches and notes from the studio. Some are things we found useful — an essay, a link, an idea worth passing on. When it is not ours, we say whose it is and link to the original.</p><p>Use the dot at the bottom right to move forward, or wander through the numbered list in any order.</p>`,
	},
	{
		num: "01",
		kind: "launch",
		label: "Fixer opens draft PRs for production errors",
		date: "2026-09-21",
		content: `<p>Fixer watches your production logs, reduces them to the handful of exceptions actually worth a human's time, and investigates each one against your real code. You get a draft pull request with a root cause, the evidence behind it, and a proposed fix.</p><p>A human reviews it. A human merges it. Fixer cannot — the GitHub App is never granted a permission that would allow a merge, and no code path calls one. It is self-hosted, and available on request.</p><p><a href="/products/fixer/">Read more about Fixer</a> or <a href="/contact/">ask for a demo</a>.</p>`,
	},
	{
		num: "02",
		kind: "launch",
		label: "WorkProof: see the work, not the worker",
		date: "2026-09-14",
		content: `<p>WorkProof is self-hosted workforce activity analytics with real privacy. It shows active vs. idle time, focus ratio, and per-person rollups — computed on your own server, with no content capture at all.</p><p>No keystrokes, no message contents, no credentials. Domains, never full URLs. The boundaries are written into the code, not just the policy.</p><p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See it live</a>.</p>`,
	},
	{
		num: "03",
		kind: "launch",
		label: "Urban Events: ticketing for Pakistan",
		date: "2026-09-07",
		content: `<p>Urban Events lets organizers publish a polished event page, sell tickets in PKR through JazzCash, Easypaisa, and bank transfer, and check guests in by QR from any phone.</p><p>Free for free events. A simple 5% per paid ticket is added at checkout — no monthly fees, no contracts. Built for student societies, MUNs, workshops, and meetups across Pakistan.</p><p><a href="https://urbanevents.pk" target="_blank" rel="noopener">Start an event</a>.</p>`,
	},
	{
		num: "04",
		kind: "link",
		label: "Focus Lab is on LinkedIn",
		date: "2026-08-30",
		source: "LinkedIn",
		url: "https://www.linkedin.com/company/110646093/",
		content: `<p>We keep a company page on LinkedIn for updates on what we are shipping. If that is where you already are, follow along there.</p>`,
	},
	{
		num: "05",
		kind: "note",
		label: "Products first, partners occasionally",
		date: "2026-08-24",
		content: `<p>We are products first. Running our own software is how we learn what shipping actually takes — retention, pricing, support, the second year.</p><p>Once in a while we take on a partner when there is a mutual fit: a real problem, a clear owner, and room to decide how to solve it. If we are not the right fit, we say so early.</p>`,
	},
	{
		num: "06",
		kind: "essay",
		label: "Do Things That Don't Scale",
		date: "2026-08-18",
		source: "Paul Graham",
		url: "https://paulgraham.com/ds.html",
		content: `<p>The case for doing the unscalable, manual work at the start: recruiting users by hand, delivering a concierge experience, and doing whatever it takes to make something people actually want. We reread it before every launch.</p>`,
	},
	{
		num: "07",
		kind: "essay",
		label: "Maker's Schedule, Manager's Schedule",
		date: "2026-08-11",
		source: "Paul Graham",
		url: "https://paulgraham.com/makersschedule.html",
		content: `<p>Why a single meeting can wreck a day of building. Makers need long, unbroken blocks; managers live in hours. The short version for us: protect the block, batch the meetings, and default to writing things down.</p>`,
	},
	{
		num: "08",
		kind: "essay",
		label: "How to Do Great Work",
		date: "2026-08-04",
		source: "Paul Graham",
		url: "https://paulgraham.com/greatwork.html",
		content: `<p>Pick work that is hard, interesting, and important, then follow your curiosity past the point most people stop. A long read we keep coming back to when we need to raise our own bar.</p>`,
	},
	{
		num: "09",
		kind: "essay",
		label: "An Obligation to Independence",
		date: "2026-07-28",
		source: "37signals",
		url: "https://37signals.com/01",
		content: `<p>No investors, no board of directors, no eyes on an exit. The clearest argument we know for staying independent — and for doing things no one would give you permission to do.</p>`,
	},
	{
		num: "10",
		kind: "essay",
		label: "Work Isn't War",
		date: "2026-07-21",
		source: "37signals",
		url: "https://37signals.com/02",
		content: `<p>The language we use about work shapes the work. A reminder to drop the battlefield metaphors and build something you would actually want to spend your days on.</p>`,
	},
	{
		num: "11",
		kind: "essay",
		label: "Profit Motive",
		date: "2026-07-14",
		source: "37signals",
		url: "https://37signals.com/04",
		content: `<p>Profit is not a dirty word. It is what lets you say no, stay small, and keep control of your own work. The counterargument to growth at any cost.</p>`,
	},
	{
		num: "12",
		kind: "essay",
		label: "The Majestic Monolith",
		date: "2026-07-07",
		source: "David Heinemeier Hansson",
		url: "https://m.signalvnoise.com/the-majestic-monolith/",
		content: `<p>Most teams do not need microservices. A well-kept monolith is a competitive advantage — fewer moving parts, one deploy, and a system one person can still hold in their head.</p>`,
	},
	{
		num: "13",
		kind: "essay",
		label: "Choose Boring Technology",
		date: "2026-06-30",
		source: "Dan McKinley",
		url: "https://mcfunley.com/choose-boring-technology",
		content: `<p>Innovation tokens are finite. Spend them on the product, not the plumbing. We reach for tools that will still be here in five years and save the novelty for what we are actually building.</p>`,
	},
	{
		num: "14",
		kind: "essay",
		label: "YAGNI",
		date: "2026-06-23",
		source: "Martin Fowler",
		url: "https://martinfowler.com/bliki/Yagni.html",
		content: `<p>You aren't gonna need it. The shortest argument for cutting scope until it fits — and for deleting the abstraction you built for a future that never arrived.</p>`,
	},
	{
		num: "15",
		kind: "essay",
		label: "Things You Should Never Do, Part I",
		date: "2026-06-16",
		source: "Joel Spolsky",
		url: "https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/",
		content: `<p>Rewriting from scratch is the single worst strategic mistake a software company can make. Read it before you propose one — it will talk you out of it.</p>`,
	},
	{
		num: "16",
		kind: "essay",
		label: "Don't Call Yourself A Programmer",
		date: "2026-06-09",
		source: "Patrick McKenzie",
		url: "https://www.kalzumeus.com/2011/10/28/dont-call-yourself-a-programmer/",
		content: `<p>On the business of software: value, pricing, and why the code is not the point. A useful corrective when we start optimizing the wrong thing.</p>`,
	},
	{
		num: "17",
		kind: "essay",
		label: "Shape Up",
		date: "2026-06-02",
		source: "Ryan Singer / Basecamp",
		url: "https://basecamp.com/shapeup",
		content: `<p>Fixed time, variable scope, and a real appetite for the work. The method behind how we run a cycle — and the reason we would rather cut scope than move a date without a reason.</p>`,
	},
	{
		num: "18",
		kind: "essay",
		label: "The Twelve-Factor App",
		date: "2026-05-26",
		source: "Adam Wiggins / Heroku",
		url: "https://12factor.net",
		content: `<p>The checklist we run against every service before it goes to production: config in the environment, stateless processes, logs as event streams, and a clean build/release/run split.</p>`,
	},
	{
		num: "19",
		kind: "quote",
		label: "Make something people want.",
		date: "2026-05-19",
		source: "Paul Graham",
		url: "https://paulgraham.com/ds.html",
		content: `<p>The whole game in four words. Everything else — pricing, positioning, growth — is downstream of building the thing people actually want.</p>`,
	},
	{
		num: "20",
		kind: "note",
		label: "Self-hosted by default",
		date: "2026-05-12",
		content: `<p>The products we run for other teams — WorkProof and Fixer — are self-hosted. Your data stays on your infrastructure, and you keep the keys. We would rather sell you software you can walk away with than lock you in.</p>`,
	},
	{
		num: "21",
		kind: "essay",
		label: "The Joel Test",
		date: "2026-05-05",
		source: "Joel Spolsky",
		url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/",
		content: `<p>Twelve yes/no questions that tell you how good a software team is. We are not at twelve yet, but we know which ones we are missing and why.</p>`,
	},
	{
		num: "22",
		kind: "essay",
		label: "The Law of Leaky Abstractions",
		date: "2026-04-28",
		source: "Joel Spolsky",
		url: "https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/",
		content: `<p>All non-trivial abstractions, to some degree, are leaky. A good reason to understand the layer below the one you are working in — and to be suspicious of anything that promises you never will.</p>`,
	},
	{
		num: "23",
		kind: "essay",
		label: "Worse is Better",
		date: "2026-04-21",
		source: "Richard P. Gabriel",
		url: "https://www.dreamsongs.com/WorseIsBetter.html",
		content: `<p>The argument that simpler, slightly-less-correct software often wins by being easier to port, adopt, and evolve. A useful counterweight to our own instinct for the perfect design.</p>`,
	},
	{
		num: "24",
		kind: "essay",
		label: "The Cathedral and the Bazaar",
		date: "2026-04-14",
		source: "Eric S. Raymond",
		url: "http://www.catb.org/~esr/writings/cathedral-bazaar/cathedral-bazaar/",
		content: `<p>Why open, iterative development beats the closed, cathedral model. The line that stuck with us: "given enough eyeballs, all bugs are shallow."</p>`,
	},
	{
		num: "25",
		kind: "essay",
		label: "Startups in 13 Sentences",
		date: "2026-04-07",
		source: "Paul Graham",
		url: "https://paulgraham.com/13sentences.html",
		content: `<p>Thirteen short sentences that say more than most books on the subject. We keep it pinned: make something people want, stay small, and don't run out of money.</p>`,
	},
	{
		num: "26",
		kind: "essay",
		label: "Write code that is easy to delete",
		date: "2026-03-31",
		source: "programming is terrible",
		url: "https://programmingisterrible.com/post/139222674273/write-code-that-is-easy-to-delete-not-easy-to",
		content: `<p>Code is a liability, not an asset. Aim to write the kind you can remove without a rewrite — it changes how you draw every boundary.</p>`,
	},
	{
		num: "27",
		kind: "essay",
		label: "The Grug Brained Developer",
		date: "2026-03-24",
		source: "grugbrain.dev",
		url: "https://grugbrain.dev",
		content: `<p>A funny, sharp case for keeping complexity out of your code. Read it once for the jokes, again for the point.</p>`,
	},
];
