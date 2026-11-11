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
		kind: "launch",
		label: "Urban Events: print-at-home tickets",
		date: "2026-10-20",
		content: `<p>Event organisers can now download a print-ready PDF ticket with guest name, venue, time, and scannable QR. Tested on every printer in Pakistan.</p><p><a href="https://urbanevents.focuslab.pk" target="_blank" rel="noopener">Start an event</a>.</p>`,
	},
	{
		num: "03",
		kind: "launch",
		label: "Fixer opens draft PRs for production errors",
		date: "2026-09-21",
		content: `<p>Fixer watches your production logs, reduces them to the handful of exceptions actually worth a human's time, and investigates each one against your real code. You get a draft pull request with a root cause, the evidence behind it, and a proposed fix.</p><p>A human reviews it. A human merges it. Fixer cannot — the GitHub App is never granted a permission that would allow a merge, and no code path calls one. It is self-hosted, and available on request.</p><p><a href="https://fixer.focuslab.pk" target="_blank" rel="noopener">Read more about Fixer</a> or <a href="/contact/">ask for a demo</a>.</p>`,
	},
	{
		num: "04",
		kind: "launch",
		label: "WorkProof: see the work, not the worker",
		date: "2026-09-14",
		content: `<p>WorkProof is self-hosted workforce activity analytics with real privacy. It shows active vs. idle time, focus ratio, and per-person rollups — computed on your own server, with no content capture at all.</p><p>No keystrokes, no message contents, no credentials. Domains, never full URLs. The boundaries are written into the code, not just the policy.</p><p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See it live</a>.</p>`,
	},
	{
		num: "05",
		kind: "launch",
		label: "Urban Events: ticketing for Pakistan",
		date: "2026-09-07",
		content: `<p>Urban Events lets organizers publish a polished event page, sell tickets in PKR through JazzCash, Easypaisa, and bank transfer, and check guests in by QR from any phone.</p><p>Free for free events. A simple 5% per paid ticket is added at checkout — no monthly fees, no contracts. Built for student societies, MUNs, workshops, and meetups across Pakistan.</p><p><a href="https://urbanevents.focuslab.pk" target="_blank" rel="noopener">Start an event</a>.</p>`,
	},
	{
		num: "06",
		kind: "note",
		label: "Products first, partners occasionally",
		date: "2026-08-24",
		content: `<p>We are products first. Running our own software is how we learn what shipping actually takes — retention, pricing, support, the second year.</p><p>Once in a while we take on a partner when there is a mutual fit: a real problem, a clear owner, and room to decide how to solve it. If we are not the right fit, we say so early.</p>`,
	},
	{
		num: "07",
		kind: "launch",
		label: "WorkProof adds weekly digests",
		date: "2026-03-03",
		content: `<p>WorkProof now sends one email a week with the numbers that changed — focus ratio, meeting load, hours outside your team&apos;s window.</p><p>Generated on your own server and sent by your own mail relay. Nothing leaves your infrastructure.</p><p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See it live</a>.</p>`,
	},
	{
		num: "08",
		kind: "launch",
		label: "Urban Events: bank transfer in the browser",
		date: "2026-02-10",
		content: `<p>Bank transfer now shows a unique reference number per order and marks the ticket paid when the payment lands, usually inside a minute during business hours.</p><p>No more asking someone to email you a receipt.</p><p><a href="https://urbanevents.focuslab.pk" target="_blank" rel="noopener">Start an event</a>.</p>`,
	},
	{
		num: "09",
		kind: "launch",
		label: "Fixer: group by exception, not by request",
		date: "2026-01-06",
		content: `<p>Fixer used to file one draft pull request per error. Forty pull requests in a busy week is the same as zero.</p><p>It now groups errors with a shared root cause into a single branch, and files one pull request per investigation.</p>`,
	},
	{
		num: "10",
		kind: "launch",
		label: "WorkProof: per-person rollups",
		date: "2025-07-01",
		content: `<p>WorkProof now shows weekly rollups per person: meeting load, focus ratio, and hours outside your team&apos;s window — all on your own server.</p><p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See it live</a>.</p>`,
	},
	{
		num: "11",
		kind: "launch",
		label: "Urban Events: check-in works offline",
		date: "2025-05-27",
		content: `<p>The check-in list works with no connection and syncs when the phone sees signal again. Duplicate scans are resolved by timestamp.</p><p><a href="https://urbanevents.focuslab.pk" target="_blank" rel="noopener">Start an event</a>.</p>`,
	},
	{
		num: "12",
		kind: "note",
		label: "We are a studio, not an agency",
		date: "2025-04-29",
		content: `<p>When we do take on partner work, it is on the same terms as our own products: a real problem, a clear owner, and enough room to decide how to solve it. If we are not the right fit we say so in the first reply, not the third.</p><p>Being paid to be unhelpful is a bad way to spend a year.</p>`,
	},
	{
		num: "13",
		kind: "launch",
		label: "Fixer: evidence in the pull request",
		date: "2025-04-15",
		content: `<p>Every draft pull request now opens with the evidence — log lines, code path, and the commit that introduced it. Not a link to a dashboard. The actual thing.</p><p><a href="https://fixer.focuslab.pk" target="_blank" rel="noopener">Read more about Fixer</a>.</p>`,
	},
	{
		num: "14",
		kind: "launch",
		label: "WorkProof: the whole story is local",
		date: "2025-03-11",
		content: `<p>WorkProof has no server we control and no account to create. You run it, it talks to your own agent, and the database is a file on your disk.</p><p>There is no free tier because there is no free tier for us to offer — there is no us.</p><p><a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See it live</a>.</p>`,
	},
	{
		num: "15",
		kind: "launch",
		label: "Fixer: no merge permission, still",
		date: "2024-11-19",
		content: `<p>The GitHub App cannot merge, and there is no code path that could. The constraint is the product.</p><p><a href="https://fixer.focuslab.pk" target="_blank" rel="noopener">Read more about Fixer</a>.</p>`,
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
