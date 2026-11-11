# Self-hosted fonts

## DM Sans

- Source: `@fontsource-variable/dm-sans@5.3.0`, Google Fonts revision v17.
- License: SIL Open Font License 1.1, reproduced in `DM-Sans-OFL.txt`.
- Upstream: https://github.com/googlefonts/dm-fonts
- Files are the unmodified Latin and extended-Latin `standard` WOFF2 subsets,
  with normal and italic cuts. Both support weight 100–1000 and optical size 9–40.
- Filenames include the revision and the first 12 characters of the SHA-256
  content hash. Replace files under new names when updating them, since the
  Worker serves `/assets/` with immutable caching.

Only the normal Latin file is preloaded. The browser loads other subsets and
italics on demand using the declared Unicode ranges.

Lab Grotesque Mono remains in use for stream numbers and code. Existing
Lab Grotesque assets are retained, but the sans-serif cuts are no longer loaded.
