# Content guide

Everything on the site is driven by typed data files in `src/data/`. There is
no CMS and no database: edit a file, commit, deploy. This guide is written so an
LLM or a person can add content correctly without touching components.

After any change:

```bash
npm run check     # type-checks (must be 0 errors)
npm run build     # builds to dist/
npm run test:ui   # search normalization and email-draft tests
npm run preview   # inspect the local production build
```

Publish with `npm run deploy` only after the change is reviewed and deployment is approved.

## The stream — `src/data/stream.ts`

The complete feed lives at `/stream/`. The homepage introduces the studio and
shows a few selected entries. Each entry is self-contained and opens at `/<num>`.
Previous/next links and the nearby-entry list work without JavaScript.

```ts
export type StreamKind = "note" | "launch" | "link" | "quote" | "essay";

export interface StreamEntry {
	num: string; // "00", "01", ... — unique, contiguous, zero-padded
	kind: StreamKind;
	label: string; // the headline shown in the feed
	date: string; // "YYYY-MM-DD"
	source?: string; // author/publication — required for curated kinds
	url?: string; // link to the original — required for curated kinds
	content: string; // HTML fragment (see rules below)
}
```

Rules:

- `num` must be unique and contiguous. To add an entry, use the next number
  (e.g. if the last is `27`, add `28`). Never renumber existing entries — the
  URLs are permanent.
- `kind` drives the label and the CTA:
  - `note`, `launch` — ours; no `source`/`url`.
  - `essay`, `quote`, `link` — curated; **always** set `source` and `url`.
- `content` is an HTML string. Use `<p>`, `<h2>`, `<ul>/<li>`, `<strong>`,
  `<em>`, and `<a>`. Keep it short (2–4 paragraphs). Do not include a top-level
  heading — the `label` is the heading.
- For curated entries, the detail page renders a "Read the original" button from
  `url`; do not also link it inside `content` unless you are pointing somewhere
  else.
- Attribute accurately. Never present someone else's writing as ours.

Example (curated essay):

```ts
{
	num: "28",
	kind: "essay",
	label: "The Cathedral and the Bazaar",
	date: "2026-10-01",
	source: "Eric S. Raymond",
	url: "http://www.catb.org/~esr/writings/cathedral-bazaar/cathedral-bazaar/",
	content: `<p>Why open, iterative development beats the closed model. "Given enough eyeballs, all bugs are shallow."</p>`,
},
```

Example (our own launch):

```ts
{
	num: "29",
	kind: "launch",
	label: "WorkProof adds CSV export",
	date: "2026-10-03",
	content: `<p>You can now export a week of activity as CSV. <a href="https://workproof.focuslab.pk" target="_blank" rel="noopener">See it live</a>.</p>`,
},
```

## Products — `src/data/products.ts`

```ts
export interface Product {
	slug: string; // url: /products/<slug>/
	name: string;
	tagline: string; // one line
	summary: string; // 1–2 sentences
	url?: string; // public site, if any
	selfHosted?: boolean;
	pricing?: string; // one line
	features: { title: string; body: string }[];
	stack?: string[]; // optional
}
```

Rendered as a hero (name, tagline, summary, pricing, CTAs) plus a feature grid.
If `url` is set the primary CTA is "Visit <name>"; otherwise it is a
"Request access or a demo" mailto. The homepage and Products page use the shared
`ProductCard` component and link to the product’s detail page, not its external site.
Keep product links in the footer in step when adding or removing products.

## Books — `src/data/books.ts`

`{ slug, title, author, description, links: {label,href}[], mark, tint }`.
`mark` is a 2-letter illustrated-cover label. The presentation cycles through
four coordinated cover colours independently of the page background. The legacy
`tint` field remains in the data for compatibility but no longer changes the page.

## Thoughts — `src/data/thoughts.ts`

Curated external writing only: `{ title, source, url, note }`. Every entry must
have a working `url` and correct `source`. Verify links before committing.

## Podcast — `src/data/podcast.ts`

Curated shows only: `{ show, title, url, note }`. The first entry is featured.
Links open the show’s own website; the studio does not host a player or podcast feed.

## Policies — `src/data/policies.ts`

`{ slug, title, intro, sections: {id,heading,body[]}[] }`. The `updates` entry
is special: it is linked from the index but not listed.
Jobs and policy updates use `EmailRequest` to prepare a mailto draft. This is
not an automatic subscription or a sending endpoint. Do not promise policy dates
or a mailing-list registration that the implementation does not provide.

## Style rules

- Sentence case for labels and headings (not Title Case), except proper nouns.
- Em dashes are fine; use them sparingly.
- No emoji.
- Keep product copy factual. Do not invent metrics, customers, or funding.
- Verify every external URL returns 200 before committing.
