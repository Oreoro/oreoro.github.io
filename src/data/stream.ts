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
	{
		num: "28",
		kind: "note",
		label: "We ship on Fridays, rarely",
		date: "2026-03-17",
		content: `<p>A useful constraint we tried: if a change is not going out by Friday afternoon, it waits for the next cycle. The point is not the day. The point is that "we'll just push it now" stops being a thing anyone can do on a Tuesday at 4pm.</p><p>We still slip. But the number of decisions made at 4pm has dropped to roughly none, and that was the whole goal.</p>`,
	},
	{
		num: "29",
		kind: "note",
		label: "Every product has a one-sentence version",
		date: "2026-03-10",
		content: `<p>If you cannot say what a thing does in one sentence, nobody on your team agrees on what it does. We write that sentence before we write the roadmap, and we keep it in the repo, in the deck, and on the pricing page.</p><p>Fixer: "It opens draft pull requests for the production errors worth your time." Urban Events: "It sells and checks in tickets for events in Pakistan." If a sentence needs a second clause, the product is two products.</p>`,
	},
	{
		num: "30",
		kind: "launch",
		label: "WorkProof adds weekly digests",
		date: "2026-03-03",
		content: `<p>WorkProof now sends one email a week with the numbers that actually changed — focus ratio, meeting load, hours outside your team's window — instead of a live dashboard you have to remember to open.</p><p>The digest is generated on your own server and sent by your own mail relay. No report leaves your infrastructure, because there is nowhere for it to leave to.</p><p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See it live</a>.</p>`,
	},
	{
		num: "31",
		kind: "essay",
		label: "Small Teams",
		date: "2026-02-24",
		source: "37signals",
		url: "https://37signals.com/03",
		content: `<p>The whole case for a company that fits in one room, in about four hundred words. The argument that you can be more ambitious by being smaller, which is the opposite of what you would guess.</p>`,
	},
	{
		num: "32",
		kind: "note",
		label: "The fix is never a meeting",
		date: "2026-02-17",
		content: `<p>When something goes wrong, the first instinct is to talk about it. We tried a rule: no meeting may be scheduled to discuss a problem that has an owner. The owner writes a note instead, and if the note is not enough, then we have a meeting.</p><p>It is not a law — some problems genuinely need the room. But the bar got high enough that "let's discuss" stopped being the default opening move.</p>`,
	},
	{
		num: "33",
		kind: "launch",
		label: "Urban Events: bank transfer in the browser",
		date: "2026-02-10",
		content: `<p>JazzCash and Easypaisa were already live. Bank transfer was a screenshot-and-wait workflow, which is fine for a wedding and miserable for a student society running a weekly quiz night.</p><p>Bank transfer now shows a unique reference number per order and marks the ticket paid when the payment lands, usually inside a minute during business hours. It is not clever. It is just not asking someone to email you a receipt.</p><p><a href="https://urbanevents.pk" target="_blank" rel="noopener">Start an event</a>.</p>`,
	},
	{
		num: "34",
		kind: "note",
		label: "We count the support tickets we did not get",
		date: "2026-02-03",
		content: `<p>Every product we run has a number for "things that went wrong and nobody told us about." We estimate it by asking, at random, what would have made someone churn — and it is always much larger than the inbox.</p><p>The inbox is the floor, not the measure. Treating it as the measure is how you end up optimising for people who write you emails.</p>`,
	},
	{
		num: "35",
		kind: "quote",
		label: "Err on the side of do",
		date: "2026-01-27",
		source: "37signals",
		url: "https://37signals.com/05",
		content: `<p>When a decision is genuinely close, making it and living with it beats waiting for certainty that is not coming. The cost of being wrong is usually recoverable. The cost of the delay is not.</p>`,
	},
	{
		num: "36",
		kind: "note",
		label: "Documentation is a product surface",
		date: "2026-01-20",
		content: `<p>We now treat docs with the same suspicion as a UI: if it has not been read in the last ninety days, we delete it. Stale documentation is not neutral — it is worse than nothing, because it is confidently wrong and costs a reader their time before it costs them anything.</p><p>Four pages beat forty. The forty is what we had. The four is what survived.</p>`,
	},
	{
		num: "37",
		kind: "note",
		label: "Pricing is a design decision",
		date: "2026-01-13",
		content: `<p>Urban Events is free for free events and charges 5% on paid tickets. That number was not a market study. It was a decision about where we wanted to sit in the cost of somebody else's event, and we chose the number that we would not mind explaining to a student society president at eleven at night.</p><p>If you cannot say the sentence out loud without wincing, the price is wrong.</p>`,
	},
	{
		num: "38",
		kind: "launch",
		label: "Fixer: group by exception, not by request",
		date: "2026-01-06",
		content: `<p>Fixer used to file a draft pull request per error. On a busy week that is forty pull requests, which is the same as zero pull requests.</p><p>It now groups errors that share a root cause into a single branch with one investigation, and files a pull request only when it has something it can actually propose. On our own logs that took a bad week from thirty-one pull requests to four.</p>`,
	},
	{
		num: "39",
		kind: "note",
		label: "A year of the stream, in one line",
		date: "2025-12-30",
		content: `<p>One hundred entries of what we built and what we read. The ratio has not changed much from the first ten: roughly a third launches, a third notes, a third things other people wrote.</p><p>That ratio is on purpose. The notes are the part we would miss, and the links are the part that keeps our opinions from calcifying.</p>`,
	},
	{
		num: "40",
		kind: "essay",
		label: "Taste for Makers",
		date: "2025-12-23",
		source: "Paul Graham",
		url: "https://paulgraham.com/taste.html",
		content: `<p>Taste is the scarce resource, not engineering talent or distribution, and unlike most scarce resources it can be trained. The practical version: build a lot, notice what you like about it, and be honest about why.</p>`,
	},
	{
		num: "41",
		kind: "note",
		label: "Nobody here is on call at 3am",
		date: "2025-12-16",
		content: `<p>We run products that other people depend on, which is exactly the situation where a quiet rotation of on-call becomes a habit nobody signed up for. It is a habit we have not built.</p><p>If something is on fire at 3am, it waits until morning and gets the first hour of the day. The number of times that has been genuinely acceptable in two years: zero.</p>`,
	},
	{
		num: "42",
		kind: "note",
		label: "One database, one language, one deploy",
		date: "2025-12-09",
		content: `<p>Every product here runs on the same stack. Same database, same language, same deployment path, same monitoring. It is a deliberate constraint: it means a problem in one product is a problem we have already solved in the other two.</p><p>This is a real cost. It means we cannot use the best tool for every job. We think it is worth about two years of engineer-time, which is a lot of better tools.</p>`,
	},
	{
		num: "43",
		kind: "launch",
		label: "Urban Events: printable QR posters",
		date: "2025-12-02",
		content: `<p>You can now download a poster-sized QR code for any event, with your logo, your date, and your venue. Print it, tape it up, and every person who scans it lands on the ticket page.</p><p>It is a small feature and it is the single most requested thing we have ever shipped. Nobody asked for it in a survey. They asked for it in a WhatsApp group.</p><p><a href="https://urbanevents.pk" target="_blank" rel="noopener">Make a poster</a>.</p>`,
	},
	{
		num: "44",
		kind: "essay",
		label: "MonolithFirst",
		date: "2025-11-25",
		source: "Martin Fowler & Christian Fowler",
		url: "https://martinfowler.com/bliki/MonolithFirst.html",
		content: `<p>A deliberately boring architecture strategy: build one thing, and split it only when a boundary is actually causing a problem you can name. The default should be the thing you can still hold in your head.</p>`,
	},
	{
		num: "45",
		kind: "note",
		label: "We do not do roadmaps",
		date: "2025-11-18",
		content: `<p>We know roughly what the next two months look like. Past that, we are guessing, and a document that pretends otherwise gets used as a promise.</p><p>So we keep a small list of bets with appetites instead of dates. "Spending 5F next month on ticketing" is a commitment. "Q3 will have" is a wish.</p>`,
	},
	{
		num: "46",
		kind: "note",
		label: "Errors worth a human's time",
		date: "2025-11-11",
		content: `<p>Our working definition of a production error worth waking somebody up for: it is losing money, losing data, or taking down a feature that somebody is using right now. Everything else is a ticket.</p><p>This one sentence has done more for our on-call calm than any amount of tooling. Almost every page we have ever been paged for turned out not to qualify.</p>`,
	},
	{
		num: "47",
		kind: "quote",
		label: "Meetings aren't free",
		date: "2025-11-04",
		source: "37signals",
		url: "https://37signals.com/14",
		content: `<p>Six people for an hour is not one meeting. It is eight meetings. Once you cost a calendar properly — who is in it, what it displaces, what it could have been — most recurring meetings stop justifying themselves.</p>`,
	},
	{
		num: "48",
		kind: "launch",
		label: "WorkProof: domains, never full URLs",
		date: "2025-10-28",
		content: `<p>WorkProof has never collected full URLs, and people keep asking whether it really doesn't. It doesn't. The agent records the domain, the path pattern, and the time — and that is enough to answer every question anyone has actually asked us.</p><p>The boundaries are in the code, not in a policy document. You can read them.</p><p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See it live</a>.</p>`,
	},
	{
		num: "49",
		kind: "note",
		label: "Every feature gets a name before it gets a spec",
		date: "2025-10-21",
		content: `<p>Naming a thing is the cheapest design review there is. If you cannot name it, you do not yet know what it is, and the spec you are about to write will be a list of guesses instead of a description of a problem.</p><p>Roughly a third of our ideas never survived the naming step, which is a good outcome.</p>`,
	},
	{
		num: "50",
		kind: "note",
		label: "We answer our own support tickets",
		date: "2025-10-14",
		content: `<p>There is no support team, because there is no queue for someone else to work through. The person who shipped the thing answers the email.</p><p>It is slower per ticket and much faster per problem, because the answer arrives with the fix rather than after it.</p>`,
	},
	{
		num: "51",
		kind: "essay",
		label: "The Grug Brained Developer",
		date: "2025-10-07",
		source: "grugbrain.dev",
		url: "https://grugbrain.dev",
		content: `<p>Funny on the first read, pointed on the second. A case for keeping complexity out of your code, and for the fact that most code is not a good use of anyone's cleverness.</p>`,
	},
	{
		num: "52",
		kind: "note",
		label: "Pricing in PKR, settled in PKR",
		date: "2025-09-30",
		content: `<p>Urban Events charges in rupees and takes rupees. Organisers in Karachi, Lahore, and Islamabad settle a 5% fee in a few hours instead of waiting a week on a card chargeback.</p><p>That was not a growth decision. It was a decision about who we actually wanted to be able to use the product.</p>`,
	},
	{
		num: "53",
		kind: "note",
		label: "The two-question feature review",
		date: "2025-09-23",
		content: `<p>Before anything ships: who is this for, and what do they do instead today? If the second answer is "nothing", the feature may be nice and may also be unused. If the second answer is a spreadsheet, it is probably worth building.</p>`,
	},
	{
		num: "54",
		kind: "launch",
		label: "Fixer: draft PRs from any branch",
		date: "2025-09-16",
		content: `<p>Fixer could only propose fixes on the default branch. It now branches from whatever line the exception actually lives on, which is where a surprising number of them turn out to be.</p><p>Nothing about the rule changed: a human reviews it, a human merges it, and the GitHub App still has no merge permission.</p><p><a href="/products/fixer/">Read more about Fixer</a>.</p>`,
	},
	{
		num: "55",
		kind: "note",
		label: "We keep a list of things we are not doing",
		date: "2025-09-09",
		content: `<p>It sits next to the roadmap and it is longer. A native app, a public API, a plugin system, enterprise SSO, an AI copilot — all of them are things somebody has asked for and all of them are things we have decided against.</p><p>Writing a thing down is what makes saying no to it a decision rather than a shrug.</p>`,
	},
	{
		num: "56",
		kind: "note",
		label: "Nothing in our products phones home",
		date: "2025-09-02",
		content: `<p>Not for analytics, not for errors, not for feature flags, not to check that you are still using it. The only outbound connection Urban Events makes is to the payment provider you chose at checkout.</p><p>This is a product decision and a legal one, and we would rather not have to change it later.</p>`,
	},
	{
		num: "57",
		kind: "quote",
		label: "Planning is guessing",
		date: "2025-08-26",
		source: "37signals",
		url: "https://37signals.com/33",
		content: `<p>Everything that promises to remove the uncertainty from a plan is lying about something. The best you can do is buy information cheaply, and know which parts of the plan you would throw away if you were wrong.</p>`,
	},
	{
		num: "58",
		kind: "note",
		label: "We deleted more code than we wrote this year",
		date: "2025-08-19",
		content: `<p>Which felt alarming for about a month and then felt like the best work we did all year. Half of it turned out to be an abstraction built for a second client who never arrived.</p><p>Code is a liability. The question is never how much of it you wrote, only how much of it you would have to read to change one thing.</p>`,
	},
	{
		num: "59",
		kind: "launch",
		label: "Urban Events: one event, unlimited guests",
		date: "2025-08-12",
		content: `<p>There is no cap on the number of tickets or guests on an event any more. The cap existed to stop people building a ticketing system on top of us by accident, and it was stopping a lot of legitimate events instead.</p><p>If you abuse it, we will notice, and it is one email to sort out.</p><p><a href="https://urbanevents.pk" target="_blank" rel="noopener">Start an event</a>.</p>`,
	},
	{
		num: "60",
		kind: "note",
		label: "Reading a codebase you did not write",
		date: "2025-08-05",
		content: `<p>Start with the data model, not the entry point. Where the data lives and what it is shaped like will tell you more about a system in ten minutes than an afternoon of tracing routes through the code.</p><p>Then find the migrations, oldest first. That is the actual history of the thing.</p>`,
	},
	{
		num: "61",
		kind: "note",
		label: "Free for free events is not a discount",
		date: "2025-07-29",
		content: `<p>A student society running a free quiz night is not our customer. Taking 5% of nothing from them would be pure friction, and it would make us look like we had priced for a market that is not where we are.</p><p>So the fee only appears when there is a ticket that costs money. That is the whole policy.</p>`,
	},
	{
		num: "62",
		kind: "essay",
		label: "Simple Made Easy",
		date: "2025-07-22",
		source: "Rich Hickey",
		url: "https://www.infoq.com/presentations/simple-made-easy/",
		content: `<p>Complexity is a property of the problem, not of the solution — so no amount of clever solving makes a complicated problem simple. Long, difficult, and the hour it takes has been repaid several times.</p>`,
	},
	{
		num: "63",
		kind: "note",
		label: "We write the release note nobody reads",
		date: "2025-07-15",
		content: `<p>Every entry in this stream is a release note. The idea is that the thing a customer wants to know — what changed, and does it affect me — should not be behind a login on a status page.</p><p>It is public, it is dated, and it is in order.</p>`,
	},
	{
		num: "64",
		kind: "note",
		label: "A prototype with no code is a valid prototype",
		date: "2025-07-08",
		content: `<p>Before we build anything that touches money, we describe the whole flow in plain text and read it to somebody who is not technical. If they cannot follow it, the problem is not the code — it is that we have not decided what happens yet.</p><p>This has saved us more time than any test we have ever written.</p>`,
	},
	{
		num: "65",
		kind: "launch",
		label: "WorkProof: per-person rollups",
		date: "2025-07-01",
		content: `<p>WorkProof showed what a day looked like. It now shows what a week looked like, per person, with meeting load, focus ratio, and hours outside the team's normal window — all computed on your own machine.</p><p>The purpose is not surveillance. It is the question we could never answer before: is this actually working?</p><p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See it live</a>.</p>`,
	},
	{
		num: "66",
		kind: "note",
		label: "Time zones are a design constraint",
		date: "2025-06-24",
		content: `<p>We are in Islamabad, our products are self-hosted, and half of the people who write to us are somewhere else. Every date in the product is stored in UTC and rendered in the viewer's own zone, and nobody has ever asked us to change it.</p><p>It is the single least glamorous decision that has saved us the most support tickets.</p>`,
	},
	{
		num: "67",
		kind: "quote",
		label: "The trap of marginal thinking",
		date: "2025-06-17",
		source: "37signals",
		url: "https://37signals.com/16",
		content: `<p>A series of individually reasonable, small decisions that ends somewhere nobody in the room actually chose. Worth reading before your next "let's just tweak it" review.</p>`,
	},
	{
		num: "68",
		kind: "note",
		label: "We measure what we do, not just what we ship",
		date: "2025-06-10",
		content: `<p>Lines written is a vanity metric and we stopped counting it years ago. What we count: how long from an idea to something a real person can use, and how long from a bug report to a fix.</p><p>Both numbers got worse when we grew and better when we cut scope. That is the whole lesson.</p>`,
	},
	{
		num: "69",
		kind: "note",
		label: "The backup we have actually restored from",
		date: "2025-06-03",
		content: `<p>A backup you have never restored is a hope. We restore the most recent one into a throwaway environment on a schedule, and time it. The first time we did it we found a two-year-old bug in the restore path itself.</p><p>That one bug would have been discovered at the worst possible moment, and it cost us an afternoon to find early.</p>`,
	},
	{
		num: "70",
		kind: "launch",
		label: "Urban Events: check-in works offline",
		date: "2025-05-27",
		content: `<p>Event wifi always fails at exactly the moment forty people arrive. The check-in list now works with no connection and syncs the moment the phone sees signal again.</p><p>Duplicate scans are the only genuinely hard problem here, and they are resolved by timestamp rather than by guessing.</p><p><a href="https://urbanevents.pk" target="_blank" rel="noopener">Start an event</a>.</p>`,
	},
	{
		num: "71",
		kind: "note",
		label: "We do not use a standup",
		date: "2025-05-20",
		content: `<p>A studio this size does not need a daily ceremony. What we have instead is a shared page that everyone writes on when they have something, and a rule that anything genuinely blocking gets a message rather than a meeting.</p><p>It has worked for three years. We are aware this does not scale and are not planning to.</p>`,
	},
	{
		num: "72",
		kind: "essay",
		label: "Everything Is Broken",
		date: "2025-05-13",
		source: "Dan Luu",
		url: "https://danluu.com/everything-is-broken/",
		content: `<p>A tour of how the systems everyone depends on are actually held together, and a good corrective to the belief that somebody competent is running them.</p>`,
	},
	{
		num: "73",
		kind: "note",
		label: "Everything is a support ticket first",
		date: "2025-05-06",
		content: `<p>Before we design a setting, we look for the email that asked for it. Almost every setting we have added was already being decided by hand in somebody's head, or in a spreadsheet, or by picking whichever option was wrong least often.</p><p>That is the cheapest feature research there is, and almost nobody does it.</p>`,
	},
	{
		num: "74",
		kind: "note",
		label: "We are a studio, not an agency",
		date: "2025-04-29",
		content: `<p>When we do take on partner work, it is on the same terms as our own products: a real problem, a clear owner, and enough room to decide how to solve it. If we are not the right fit we say so in the first reply, not the third.</p><p>Being paid to be unhelpful is a bad way to spend a year.</p>`,
	},
	{
		num: "75",
		kind: "note",
		label: "Accessibility is a layout decision",
		date: "2025-04-22",
		content: `<p>Not an audit at the end. If the focus ring is visible on everything, if the heading order makes sense, and if the contrast was checked when the colour was picked, then most of the work is already done and there is nothing to fix later.</p><p>We have stopped running an accessibility audit. We have not stopped doing accessibility work.</p>`,
	},
	{
		num: "76",
		kind: "launch",
		label: "Fixer: evidence in the pull request",
		date: "2025-04-15",
		content: `<p>Every draft pull request now opens with the evidence — the log lines, the code path, and the commit that introduced the line. Not a link to our internal dashboard. The actual thing.</p><p>A reviewer should be able to disagree with the root cause without leaving the page.</p><p><a href="/products/fixer/">Read more about Fixer</a>.</p>`,
	},
	{
		num: "77",
		kind: "note",
		label: "A decision log, kept honestly",
		date: "2025-04-08",
		content: `<p>Every non-obvious decision gets three lines: what we decided, why, and what would make us change our mind. No status, no owner, no review date.</p><p>The third line is the one that earns its keep. Half the entries are now wrong, and being wrong in writing is cheap.</p>`,
	},
	{
		num: "78",
		kind: "quote",
		label: "Bury the hustle",
		date: "2025-04-01",
		source: "37signals",
		url: "https://37signals.com/15",
		content: `<p>Doing good work without turning your life into a brand. The most useful thing here is the permission to stop, which most writing about work never gives you.</p>`,
	},
	{
		num: "79",
		kind: "note",
		label: "One design system, one set of rules",
		date: "2025-03-25",
		content: `<p>Spacing, type, and colour are defined once. When a page needs something new, the new thing gets added to the shared definition rather than done locally — even when doing it locally would have been faster that day.</p><p>It is slower every single time and it is the only reason this site is still coherent after four years.</p>`,
	},
	{
		num: "80",
		kind: "note",
		label: "We ship behind nothing",
		date: "2025-03-18",
		content: `<p>No feature flags, no staged rollouts, no percentage gates. The change goes out or it does not go out.</p><p>This is only possible because the blast radius is small and the rollback is a revert. Systems with a hundred times the users need the other approach, and we are not one of them.</p>`,
	},
	{
		num: "81",
		kind: "launch",
		label: "WorkProof: the whole story is local",
		date: "2025-03-11",
		content: `<p>WorkProof has no server we control and no account to create. You run it, it talks to your own agent, and the database is a file on your disk.</p><p>There is no free tier because there is no free tier for us to offer — there is no us.</p><p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See it live</a>.</p>`,
	},
	{
		num: "82",
		kind: "note",
		label: "The stream is the changelog",
		date: "2025-03-04",
		content: `<p>We stopped keeping a separate changelog a year ago. Everything that shipped is an entry here, in order, with the reasoning attached.</p><p>The reasoning is the part that matters. Nobody has ever gone back to a changelog to find out why.</p>`,
	},
	{
		num: "83",
		kind: "note",
		label: "We do not do user interviews we cannot act on",
		date: "2025-02-25",
		content: `<p>A call that produces a nice quote and nothing else is worse than no call, because it feels like research and it is not.</p><p>So every conversation has a decision attached before it happens: if this changes our mind, we will do X. If it does not, we will not. About half of them do, which is a much better hit rate than it sounds.</p>`,
	},
	{
		num: "84",
		kind: "essay",
		label: "Is Design Dead?",
		date: "2025-02-18",
		source: "Martin Fowler",
		url: "https://martinfowler.com/articles/designDead.html",
		content: `<p>A fair, non-tribal answer from somebody who had to sit on both sides of the argument. Reads like a grown-up conversation, which is rarer than it should be.</p>`,
	},
	{
		num: "85",
		kind: "note",
		label: "Own the second year, not the first",
		date: "2025-02-11",
		content: `<p>Anyone can make something good in three months. Almost nobody is still good at it in two years, and the difference is entirely made up of small, boring maintenance that nobody wants to write about.</p><p>So we budget for it up front, and we treat "it needs a rebuild" as a scheduled cost rather than an emergency.</p>`,
	},
	{
		num: "86",
		kind: "note",
		label: "Our 404 page is a list of everything",
		date: "2025-02-04",
		content: `<p>Not a search box, not a logo. The full index of the site, in order, on the page itself. People land on broken links and the first thing they do is scroll.</p><p>It has been live for two years and we have never once seen anyone search from it.</p>`,
	},
	{
		num: "87",
		kind: "quote",
		label: "Happiness is the right metric",
		date: "2025-01-28",
		source: "37signals",
		url: "https://37signals.com/29",
		content: `<p>JOMO rather than FOMO. The joy of missing out is a strategy, and it is the one this studio is actually run on: we turn down work regularly and have never once regretted it.</p>`,
	},
	{
		num: "88",
		kind: "note",
		label: "We do not use a framework we cannot explain",
		date: "2025-01-21",
		content: `<p>Rule for new dependencies: the person adding it has to be able to say what happens when it breaks, in one sentence, in a meeting.</p><p>That sentence has killed more dependencies than any audit. It also makes the ones we keep much easier to reason about at 2am.</p>`,
	},
	{
		num: "89",
		kind: "launch",
		label: "Urban Events: the whole event in the URL",
		date: "2025-01-14",
		content: `<p>Every event is a single link. No account needed to buy, no app, no confirmation email chain to forward to a friend.</p><p>For a student society, the link goes in a group chat and the job is done. That has always been the product; everything else is the machinery.</p><p><a href="https://urbanevents.pk" target="_blank" rel="noopener">Start an event</a>.</p>`,
	},
	{
		num: "90",
		kind: "note",
		label: "We are not trying to be the biggest",
		date: "2025-01-07",
		content: `<p>Three products, a small number of partners, and no plan to grow the headcount much this year. Every proposal gets asked the same question: does this make the studio harder to run next year?</p><p>Usually the answer is yes, and usually that is enough to say no.</p>`,
	},
	{
		num: "91",
		kind: "note",
		label: "The plan for a bad month",
		date: "2024-12-31",
		content: `<p>Written down in 2023 and reviewed every year since. If a month goes badly we do not respond by adding: we stop the lowest-value work, keep the maintenance, and do not make any new commitments until the next cycle.</p><p>It is not a plan anyone enjoys reading. It is the reason we have never had to panic.</p>`,
	},
	{
		num: "92",
		kind: "essay",
		label: "Choose Boring Technology",
		date: "2024-12-24",
		source: "Dan McKinley",
		url: "https://mcfunley.com/choose-boring-technology",
		content: `<p>Innovation tokens are finite, and the common way to spend them is on the plumbing. We give the product the budget and let the infrastructure be dull, and it is never once been the wrong trade.</p>`,
	},
	{
		num: "93",
		kind: "note",
		label: "We read the error before we read the stack trace",
		date: "2024-12-17",
		content: `<p>The message is written for the person who has to act on it. If we have to open the source to understand our own error, we rewrote the message, not the code.</p><p>It is a fifteen-minute change and it has saved us a genuinely unreasonable number of hours.</p>`,
	},
	{
		num: "94",
		kind: "note",
		label: "Four-day cycles, when we can",
		date: "2024-12-10",
		content: `<p>Most of what we build fits in four days if we cut it honestly. The fifth day is where a cycle goes to become a two-week project with a deadline that quietly moves.</p><p>When something genuinely needs more, it gets a real pitch and a real appetite rather than a fifth day and hope.</p>`,
	},
	{
		num: "95",
		kind: "quote",
		label: "Companies aren't families",
		date: "2024-12-03",
		source: "37signals",
		url: "https://37signals.com/35",
		content: `<p>A short, kind piece on the difference, and on why pretending otherwise hurts people. The line we keep coming back to: a job is something you do for someone, and it is fine for that to be the whole arrangement.</p>`,
	},
	{
		num: "96",
		kind: "note",
		label: "Every product page says what it is not",
		date: "2024-11-26",
		content: `<p>Under each product we list the three things people most often assume it does, and that it does not. It costs four lines and it has cut the number of unqualified enquiries to nearly zero.</p><p>Being clear about your edges is cheaper than being disappointed by them.</p>`,
	},
	{
		num: "97",
		kind: "launch",
		label: "Fixer: no merge permission, still",
		date: "2024-11-19",
		content: `<p>A year on, the GitHub App still cannot merge, and there is still no code path that could. That has not cost us a single fix that mattered.</p><p>The constraint is the product. Everything else about Fixer is negotiable; this is not, and it is written down so nobody has to ask.</p><p><a href="/products/fixer/">Read more about Fixer</a>.</p>`,
	},
	{
		num: "98",
		kind: "note",
		label: "We are suspicious of anything that needs a permission",
		date: "2024-11-12",
		content: `<p>Each permission we ask for has to be justified in one sentence that survives being read aloud to a customer. Most requests fail that test, and the ones that pass tend to be far broader than we first assumed.</p><p>We have removed more permissions than we have added, which is not a normal sentence to write.</p>`,
	},
	{
		num: "99",
		kind: "note",
		label: "The name Focus Lab",
		date: "2024-11-05",
		content: `<p>Named for the thing the work actually is: a small, focused attempt at building something that lasts. It is not a manifesto and it is not going on a business card any more than the previous one was.</p><p>It is in the footer of a website in Islamabad that has been up for four years. That is the whole brand.</p>`,
	},
	{
		num: "100",
		kind: "quote",
		label: "To lead, follow",
		date: "2024-10-29",
		source: "Will Larson",
		url: "https://staffeng.com/guides/to-lead-follow/",
		content: `<p>How to move a decision through a room without owning it. Useful for anyone who ends up writing the thing everybody then argues about.</p>`,
	},
	{
		num: "101",
		kind: "note",
		label: "We count what we gave up",
		date: "2024-10-22",
		content: `<p>Every year we list the work we turned down, and roughly a third of it is work we would now happily take. That is the point of writing it down: the cost of a no is only visible when you are looking at it later.</p><p>It is the least flattering thing we publish and the one we read most.</p>`,
	},
	{
		num: "102",
		kind: "note",
		label: "One sentence in the readme",
		date: "2024-10-15",
		content: `<p>Every repository opens with one line saying what it is and one line saying what it is not for. People used to skip straight to the setup instructions and build the wrong thing.</p><p>It is two lines. It has saved more time than any amount of documentation we have written since.</p>`,
	},
	{
		num: "103",
		kind: "note",
		label: "We hire for the second year",
		date: "2024-10-08",
		content: `<p>The question is not what can you do in your first month. It is what will you be good at in year two, once you have stopped being the new person and started being the person who knows how things work here.</p><p>That has made our hiring conversations much longer and our mistakes much rarer.</p>`,
	},
	{
		num: "104",
		kind: "note",
		label: "Paying on a published ladder",
		date: "2024-10-01",
		content: `<p>Every role has a published range, the same regardless of who is negotiating. There is no "what are your other offers" step, because the answer cannot change the number.</p><p>It is a strange thing to give up and we have never regretted it.</p>`,
	},
	{
		num: "105",
		kind: "note",
		label: "Why this stream exists",
		date: "2024-09-24",
		content: `<p>Everything we build is public software, but the thinking behind it was not. This is where it goes: launches, notes, and the occasional thing somebody else wrote that changed our mind.</p><p>Numbered and in order, newest first. That is the whole format.</p>`,
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
