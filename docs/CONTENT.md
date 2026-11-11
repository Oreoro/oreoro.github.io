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

The homepage is the complete numbered feed, one entry per line. `/stream/`
keeps a searchable archive of the same entries. Each entry is self-contained
and opens at `/<num>`. Entry pages retain 36-entry index windows, with visible
previous/next links and a nearby-entry list that work without JavaScript.

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
	slug: keyof typeof productSites; // stable identifier, not a detail-page route
	name: string;
	tagline: string; // one line
	summary: string; // 1–2 sentences
	url: string; // required public website, shared through productSites
	selfHosted?: boolean;
	pricing?: string; // one line
	features: { title: string; body: string }[];
	stack?: string[]; // optional
}
```

`productSites` in `src/data/product-sites.ts` is the shared source for website URLs.
The Products listing uses `ProductCard` and links directly to those websites.
Desktop and mobile navigation and the Studio product list use the same product
data. Product detail pages are no longer generated.

The Worker permanently redirects the retired `/products/<slug>` URLs, with or
without a trailing slash or `index.html`, to the corresponding website.
These redirects apply only to GET and HEAD and do not forward query parameters.
Additional feature, pricing, and positioning data is retained for content editing,
but no longer renders as a separate product page.

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

## Typography

DM Sans is self-hosted in `public/assets/fonts/` under the SIL Open Font License.
The shell uses a single preloaded Latin variable font for body copy, navigation,
and headings. Italics and extended Latin load only when needed. Real monospace
stream numbers retain the existing number gutter and article alignment.

Font declarations and weight tokens live in `src/styles/signals-shell.css`.
Notion content inherits the same family through `--font-sans`. Font filenames
include their version and content hash because assets use immutable caching.
Keep the accompanying license and update the preload in `BaseHead.astro` when
replacing the primary font.

## Style rules

- Sentence case for labels and headings (not Title Case), except proper nouns.
- Em dashes are fine; use them sparingly.
- No emoji.
- Keep product copy factual. Do not invent metrics, customers, or funding.
- Verify every external URL returns 200 before committing.
