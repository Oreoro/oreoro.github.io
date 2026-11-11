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
export type StreamKind = "note" | "launch";

export interface StreamEntry {
	num: string; // "01", "02", ... — unique, contiguous, zero-padded
	kind: StreamKind;
	label: string; // the headline shown in the feed
	date: string; // "YYYY-MM-DD"
	source?: string; // reserved — unused for note/launch entries
	url?: string; // reserved — unused for note/launch entries
	content: string; // HTML fragment (see rules below)
}
```

Rules:

- `num` must be unique and contiguous, zero-padded from `01`. Entries are
  kept to a small set (currently 17); renumbering the whole feed when it is
  trimmed is expected — the URLs are the numbers.
- `kind` drives the label: `note` or `launch`. All entries are ours; there is
  no `source`/`url`.
- `content` is an HTML string. Use `<p>`, `<h2>`, `<ul>/<li>`, `<strong>`,
  `<em>`, and `<a>`. Keep it short (2–4 paragraphs). Do not include a top-level
  heading — the `label` is the heading.

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
