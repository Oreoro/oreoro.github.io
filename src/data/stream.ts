/**
 * The Focus Lab stream.
 *
 * A feed, not a blog. Each entry is self-contained and can be anything we
 * want to put in front of people: a note, a launch, a link, a quote, or a
 * piece of writing we found useful. Curated entries carry their source and a
 * link to the original; our own entries stand on their own.
 *
 * The stream drives /stream, selected homepage entries, and every /NN page.
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
		num: "106",
		kind: "note",
		label: "Write down what you decided against",
		date: "2026-11-10",
		content: `<p>Every repo has a NOT_DOING.md: a list of features, refactors, and dependencies we said no to, and why. It is the most-read file because it is where the answer to &quot;why don&apos;t we just...&quot; fits on one screen.</p>`,
	},
	{
		num: "107",
		kind: "note",
		label: "The thirty-minute rollback",
		date: "2026-11-03",
		content: `<p>If we cannot undo a change in thirty minutes, the deploy pipeline is too complex. We test this once a month with whoever joined most recently. If they cannot find the revert button in four tries, we redesign the page. The record stands at four minutes, set on somebody&apos;s second day.</p>`,
	},
	{
		num: "108",
		kind: "note",
		label: "Real-time is the wrong time",
		date: "2026-10-27",
		content: `<p>We turned off every real-time notification in every product and replaced them with a daily digest that you can turn off. Sixty percent of people do. Zero people asked for the bell icon back. The red dot was a nervous habit we gave our users, and we are sorry.</p>`,
	},
	{
		num: "109",
		kind: "launch",
		label: "Urban Events: print-at-home tickets",
		date: "2026-10-20",
		content: `<p>Event organisers can now download a print-ready PDF ticket with guest name, venue, time, and scannable QR. Tested on every printer in Pakistan.</p><p><a href="https://urbanevents.pk" target="_blank" rel="noopener">Start an event</a>.</p>`,
	},
	{
		num: "110",
		kind: "note",
		label: "We do not A/B test personality",
		date: "2026-10-13",
		content: `<p>We write the sentence that says what it does and we ship it. The alternative is a culture where every line of copy goes to committee, and we have been in that room and we are not going back. The product either works or it does not. The words around it are ours to own.</p>`,
	},
	{
		num: "111",
		kind: "note",
		label: "Name the exception after the cause",
		date: "2026-10-06",
		content: `<p>Not the module. PaymentGatewayError is twenty minutes of grepping. IssuerDeclinedPostalCodeMismatch is a phone call. We renamed every exception in the codebase in an afternoon and the next incident took twelve minutes instead of forty.</p>`,
	},
	{
		num: "112",
		kind: "note",
		label: "The product is the onboarding",
		date: "2026-09-29",
		content: `<p>A welcome tour is an admission that the product is not obvious. We deleted ours and watched the numbers. Completion of the first action went up, support tickets went down, and the only email we got was asking where the tour went. It went in the bin.</p>`,
	},
	{
		num: "00",
		kind: "note",
		label: "Start here",
		date: "2026-09-22",
		content: `<p>Notes and launches from the Focus Lab studio. We are a product studio in Islamabad. We build and run our own software: Urban Events, WorkProof, and Fixer.</p><p>Use the previous and next links to move through the stream, or wander through the archive in any order.</p>`,
	},
	{
		num: "01",
		kind: "launch",
		label: "Fixer opens draft PRs for production errors",
		date: "2026-09-21",
		content: `<p>Fixer watches your production logs, reduces them to the handful of exceptions actually worth a human's time, and investigates each one against your real code. You get a draft pull request with a root cause, the evidence behind it, and a proposed fix.</p><p>A human reviews it. A human merges it. Fixer cannot — the GitHub App is never granted a permission that would allow a merge, and no code path calls one. It is self-hosted, and available on request.</p><p><a href="https://fixer.focuslab.pk" target="_blank" rel="noopener">Read more about Fixer</a> or <a href="/contact/">ask for a demo</a>.</p>`,
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
		num: "05",
		kind: "note",
		label: "Products first, partners occasionally",
		date: "2026-08-24",
		content: `<p>We are products first. Running our own software is how we learn what shipping actually takes — retention, pricing, support, the second year.</p><p>Once in a while we take on a partner when there is a mutual fit: a real problem, a clear owner, and room to decide how to solve it. If we are not the right fit, we say so early.</p>`,
	},
	{
		num: "20",
		kind: "note",
		label: "Self-hosted by default",
		date: "2026-05-12",
		content: `<p>The products we run for other teams — WorkProof and Fixer — are self-hosted. Your data stays on your infrastructure, and you keep the keys. We would rather sell you software you can walk away with than lock you in.</p>`,
	},
	{
		num: "28",
		kind: "note",
		label: "We ship on Fridays, rarely",
		date: "2026-03-17",
		content: `<p>If a change is not going out by Friday afternoon, it waits for the next cycle. Not because of the day — because &quot;we&apos;ll just push it now&quot; stops being a thing anyone does at 4pm on a Tuesday.</p>`,
	},
	{
		num: "29",
		kind: "note",
		label: "Every product has a one-sentence version",
		date: "2026-03-10",
		content: `<p>If you cannot say what a thing does in one sentence, nobody on your team agrees on what it does. We write that sentence before the roadmap, and keep it in the repo, the deck, and the pricing page.</p><p>If a sentence needs a second clause, the product is two products.</p>`,
	},
	{
		num: "30",
		kind: "launch",
		label: "WorkProof adds weekly digests",
		date: "2026-03-03",
		content: `<p>WorkProof now sends one email a week with the numbers that changed — focus ratio, meeting load, hours outside your team&apos;s window.</p><p>Generated on your own server and sent by your own mail relay. Nothing leaves your infrastructure.</p><p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See it live</a>.</p>`,
	},
	{
		num: "32",
		kind: "note",
		label: "The fix is never a meeting",
		date: "2026-02-17",
		content: `<p>No meeting may be scheduled to discuss a problem that has an owner. The owner writes a note instead, and if the note is not enough, then we have a meeting.</p><p>It is not a law. But the bar got high enough that &quot;let&apos;s discuss&quot; is no longer the default opening move.</p>`,
	},
	{
		num: "33",
		kind: "launch",
		label: "Urban Events: bank transfer in the browser",
		date: "2026-02-10",
		content: `<p>Bank transfer now shows a unique reference number per order and marks the ticket paid when the payment lands, usually inside a minute during business hours.</p><p>No more asking someone to email you a receipt.</p><p><a href="https://urbanevents.pk" target="_blank" rel="noopener">Start an event</a>.</p>`,
	},
	{
		num: "34",
		kind: "note",
		label: "We count the support tickets we did not get",
		date: "2026-02-03",
		content: `<p>The inbox is the floor, not the measure. Treating it as the measure is how you end up optimising for people who write you emails.</p>`,
	},
	{
		num: "36",
		kind: "note",
		label: "Documentation is a product surface",
		date: "2026-01-20",
		content: `<p>If a doc has not been read in ninety days, we delete it. Stale documentation is worse than nothing: it is confidently wrong and costs a reader their time.</p><p>Four pages beat forty. The forty is what we had. The four is what survived.</p>`,
	},
	{
		num: "37",
		kind: "note",
		label: "Pricing is a design decision",
		date: "2026-01-13",
		content: `<p>Urban Events charges 5% on paid tickets. That was not a market study. It was the number we would not mind explaining to a student society president at eleven at night.</p><p>If you cannot say the price out loud without wincing, it is wrong.</p>`,
	},
	{
		num: "38",
		kind: "launch",
		label: "Fixer: group by exception, not by request",
		date: "2026-01-06",
		content: `<p>Fixer used to file one draft pull request per error. Forty pull requests in a busy week is the same as zero.</p><p>It now groups errors with a shared root cause into a single branch, and files one pull request per investigation.</p>`,
	},
	{
		num: "41",
		kind: "note",
		label: "Nobody here is on call at 3am",
		date: "2025-12-16",
		content: `<p>If something is on fire at 3am, it waits until morning and gets the first hour of the day. The number of times that has been genuinely acceptable: zero.</p>`,
	},
	{
		num: "42",
		kind: "note",
		label: "One database, one language, one deploy",
		date: "2025-12-09",
		content: `<p>Every product here runs on the same stack. A problem in one is a problem we have already solved in the other two.</p><p>We cannot use the best tool for every job. We think that is worth about two years of engineer-time.</p>`,
	},
	{
		num: "43",
		kind: "launch",
		label: "Urban Events: printable QR posters",
		date: "2025-12-02",
		content: `<p>Download a poster-sized QR code for any event, with logo, date, and venue. Every person who scans it lands on the ticket page.</p><p>The most requested feature we have ever shipped. Nobody asked for it in a survey. They asked for it in a WhatsApp group.</p><p><a href="https://urbanevents.pk" target="_blank" rel="noopener">Make a poster</a>.</p>`,
	},
	{
		num: "45",
		kind: "note",
		label: "We do not do roadmaps",
		date: "2025-11-18",
		content: `<p>We know roughly what the next two months look like. Past that, we are guessing.</p><p>So we keep a list of bets with appetites instead of dates. &quot;Spending a month on ticketing&quot; is a commitment. &quot;Q3 will have&quot; is a wish.</p>`,
	},
	{
		num: "46",
		kind: "note",
		label: "Errors worth a human's time",
		date: "2025-11-11",
		content: `<p>Worth waking somebody up for: losing money, losing data, or taking down a feature somebody is using right now. Everything else is a ticket.</p>`,
	},
	{
		num: "48",
		kind: "launch",
		label: "WorkProof: domains, never full URLs",
		date: "2025-10-28",
		content: `<p>WorkProof records the domain and the path pattern, never the full URL. That is enough to answer every question anyone has actually asked.</p><p>The boundaries are in the code. You can read them.</p><p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See it live</a>.</p>`,
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
		content: `<p>The person who shipped the thing answers the email. No queue, no handoff.</p><p>Slower per ticket, faster per problem — the answer arrives with the fix, not after it.</p>`,
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
		content: `<p>Fixer could only propose fixes on the default branch. It now branches from whatever line the exception actually lives on, which is where a surprising number of them turn out to be.</p><p>Nothing about the rule changed: a human reviews it, a human merges it, and the GitHub App still has no merge permission.</p><p><a href="https://fixer.focuslab.pk" target="_blank" rel="noopener">Read more about Fixer</a>.</p>`,
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
		content: `<p>Taking 5% of nothing from a free event is pure friction. The fee only appears when there is a ticket that costs money.</p>`,
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
		content: `<p>WorkProof now shows weekly rollups per person: meeting load, focus ratio, and hours outside your team&apos;s window — all on your own server.</p><p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See it live</a>.</p>`,
	},
	{
		num: "66",
		kind: "note",
		label: "Time zones are a design constraint",
		date: "2025-06-24",
		content: `<p>Every date is stored in UTC and rendered in the viewer&apos;s own zone. Nobody has ever asked us to change it.</p>`,
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
		content: `<p>We restore the most recent backup into a throwaway environment on a schedule, and time it. The first time we did it we found a two-year-old bug in the restore path itself.</p>`,
	},
	{
		num: "70",
		kind: "launch",
		label: "Urban Events: check-in works offline",
		date: "2025-05-27",
		content: `<p>The check-in list works with no connection and syncs when the phone sees signal again. Duplicate scans are resolved by timestamp.</p><p><a href="https://urbanevents.pk" target="_blank" rel="noopener">Start an event</a>.</p>`,
	},
	{
		num: "71",
		kind: "note",
		label: "We do not use a standup",
		date: "2025-05-20",
		content: `<p>A shared page everyone writes on when they have something, and a rule that anything genuinely blocking gets a message rather than a meeting.</p>`,
	},
	{
		num: "73",
		kind: "note",
		label: "Everything is a support ticket first",
		date: "2025-05-06",
		content: `<p>Before we design a setting, we look for the email that asked for it. Almost every setting was already being decided by hand in somebody&apos;s head, or in a spreadsheet, or by picking whichever option was wrong least often.</p>`,
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
		content: `<p>If the focus ring is visible, the heading order makes sense, and the contrast was checked when the colour was picked, most of the work is already done. Nothing to fix later.</p>`,
	},
	{
		num: "76",
		kind: "launch",
		label: "Fixer: evidence in the pull request",
		date: "2025-04-15",
		content: `<p>Every draft pull request now opens with the evidence — log lines, code path, and the commit that introduced it. Not a link to a dashboard. The actual thing.</p><p><a href="https://fixer.focuslab.pk" target="_blank" rel="noopener">Read more about Fixer</a>.</p>`,
	},
	{
		num: "77",
		kind: "note",
		label: "A decision log, kept honestly",
		date: "2025-04-08",
		content: `<p>Every non-obvious decision gets three lines: what we decided, why, and what would make us change our mind. No status, no owner, no review date.</p><p>The third line is the one that earns its keep. Half the entries are now wrong, and being wrong in writing is cheap.</p>`,
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
		num: "83",
		kind: "note",
		label: "We do not do user interviews we cannot act on",
		date: "2025-02-25",
		content: `<p>A call that produces a quote and nothing else is worse than no call. Every conversation has a decision attached before it happens: if this changes our mind, we will do X. If it does not, we will not.</p>`,
	},
	{
		num: "85",
		kind: "note",
		label: "Own the second year, not the first",
		date: "2025-02-11",
		content: `<p>Anyone can make something good in three months. Almost nobody is still good at it in two years, and the difference is entirely made up of small, boring maintenance that nobody wants to write about.</p><p>So we budget for it up front, and we treat "it needs a rebuild" as a scheduled cost rather than an emergency.</p>`,
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
		content: `<p>Every event is a single link. No account needed, no app, no confirmation email chain. For a student society, the link goes in a group chat and the job is done.</p><p><a href="https://urbanevents.pk" target="_blank" rel="noopener">Start an event</a>.</p>`,
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
		num: "93",
		kind: "note",
		label: "We read the error before we read the stack trace",
		date: "2024-12-17",
		content: `<p>The message is written for the person who has to act on it. If we have to open the source to understand our own error, we rewrote the message.</p><p>A fifteen-minute change.</p>`,
	},
	{
		num: "94",
		kind: "note",
		label: "Four-day cycles, when we can",
		date: "2024-12-10",
		content: `<p>Most of what we build fits in four days if we cut it honestly. The fifth day is where a cycle goes to become a two-week project with a deadline that quietly moves.</p><p>When something genuinely needs more, it gets a real pitch and a real appetite rather than a fifth day and hope.</p>`,
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
		content: `<p>The GitHub App cannot merge, and there is no code path that could. The constraint is the product.</p><p><a href="https://fixer.focuslab.pk" target="_blank" rel="noopener">Read more about Fixer</a>.</p>`,
	},
	{
		num: "98",
		kind: "note",
		label: "We are suspicious of anything that needs a permission",
		date: "2024-11-12",
		content: `<p>Each permission has to be justified in one sentence read aloud to a customer. Most requests fail that test.</p><p>We have removed more permissions than we have added.</p>`,
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
