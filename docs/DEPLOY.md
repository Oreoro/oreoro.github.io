# Deploy guide

The site is a static Astro build served by a Cloudflare Worker named `focuslab`
(assets from `./dist`, plus a tiny worker for the optional Context API). The
custom domain `focuslab.pk` is attached to that worker by a zone route
(`focuslab.pk/*`).

## Deploy locally (works today)

```bash
npm run deploy         # astro build && wrangler deploy
npm run deploy:purge   # the above, then purge the Cloudflare cache
```

`wrangler` is a devDependency, so `npm run deploy` builds and deploys in one
step. It uses the Cloudflare login from `wrangler login` (OAuth) or
`CLOUDFLARE_API_TOKEN` if set.

## Deploy from GitHub Actions (currently red)

`.github/workflows/deploy-cloudflare.yml` runs on push to `main` and uses
`cloudflare/wrangler-action` with two repo secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The workflow fails with:

```
A request to the Cloudflare API (/accounts/***/workers/scripts/focuslab/assets-upload-session) failed.
No access to the specified resource.
```

That means the stored `CLOUDFLARE_API_TOKEN` cannot deploy the `focuslab`
worker — it is under-scoped or belongs to a different account. **This is a
secret problem, not a code problem**; the site is live because local
`npm run deploy` works.

### Fix it

1. Cloudflare dashboard → **My Profile → API Tokens → Create Token → Custom
   token**, scoped to the account that owns `focuslab`
   (`6ddd824137231b85fd268c2bfa3f0c7f`) with:

   | Scope                        | Permission                                     |
   | ---------------------------- | ---------------------------------------------- |
   | Account → Workers Scripts    | Edit                                           |
   | Account → Workers KV Storage | Edit (only if you add KV)                      |
   | Zone → Workers Routes        | Edit (for the `focuslab.pk/*` route)           |
   | Zone → Cache Purge           | Purge (only if you want the post-deploy purge) |

   Zone resources: include `focuslab.pk`.

2. Set the secrets (either in the dashboard or with the GitHub CLI):

   ```bash
   gh secret set CLOUDFLARE_API_TOKEN --repo Oreoro/oreoro.github.io
   gh secret set CLOUDFLARE_ACCOUNT_ID --repo Oreoro/oreoro.github.io
   ```

3. Re-run the workflow: `gh workflow run deploy-cloudflare.yml`.

### Alternative: Cloudflare Git integration

Instead of GitHub Actions, you can connect the repo to the Worker
(Cloudflare dashboard → Workers → `focuslab` → Settings → Builds) and let
Cloudflare build and deploy on push. That removes the need for any GitHub
secret. Build command: `npm run build`; deploy: `npx wrangler deploy`.

## Caching / CDN

- Hashed assets (`/_astro/*`) are immutable and safe to cache forever.
- HTML is served `max-age=0, must-revalidate`, so a deploy is visible
  immediately without a purge.
- `npm run purge` (or `deploy:purge`) clears the whole zone cache. It reads
  `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ZONE_ID` (defaults to the `focuslab.pk`
  zone) and skips cleanly when no token is present.

To make CI also purge, add a step after the wrangler action:

```yaml
- name: Purge cache
  run: node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/purge-cache.mts
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## Redirects

Astro `redirects` in `astro.config.ts` are generated as static redirect pages
into `dist/`. Add new ones in `constants-config.json5` under `redirects`.
