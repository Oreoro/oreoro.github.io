# Focus Lab CMS Worker

Notion Worker (beta) for **focuslab.pk**. It gives Notion Custom Agents
deterministic content tools, keeps the product sites monitored, and can rebuild
the site.

- Worker: `focuslab-cms` (workspace: Bilal's Space)
- CMS data source: `53b6280a-42b0-4026-b7e5-2cf864d30878` (Focus Lab CMS)

## Capabilities

### Agent tools (`worker.tool`)

| Key | What it does |
| --- | --- |
| `focuslabPlaybook` | Returns the content workflow and house rules. Call first. |
| `listContent` | List CMS entries (filter by type / published / tag). |
| `getContent` | Read one entry by slug, including its Markdown body. |
| `auditContent` | QA pass: missing slugs/summaries, duplicates, drafts. |
| `createContent` | Create a Page / Product / Article / Update. |
| `updateContent` | Patch fields and/or replace the Markdown body. |
| `setPublished` | Publish or unpublish by slug. |
| `archiveContent` | Move an entry to trash. |
| `deploySite` | Trigger a focuslab.pk rebuild. |

### Sync (`worker.sync`)

- `siteMonitorSync` (replace, hourly) writes into the managed
  **Focus Lab Site Monitor** database. It reads Product links from the CMS plus
  `FOCUSLAB_SITE_URL`, checks each site, and records status, HTTP code, page
  title, meta description, and response time.

### Webhook (`worker.webhook`)

- `onDeployRequest` — POST `{ "action": "deploy", "reason": "..." }` to trigger a
  rebuild. Optional shared secret in the `x-focuslab-secret` header.

## Configure

Copy `.env.example` to `.env` and fill in:

- `NOTION_API_TOKEN` — PAT used by syncs, webhooks, and local exec. (Tools called
  by a Custom Agent are pre-authenticated and ignore this.)
- `DEPLOY_HOOK_URL` **or** `GITHUB_DEPLOY_TOKEN` + `GITHUB_DEPLOY_REPO` to make
  `deploySite` and the webhook actually rebuild.
- `AUTO_DEPLOY_ON_PUBLISH=true` to rebuild automatically when publishing.
- `WEBHOOK_SHARED_SECRET` to require a secret header on the webhook.

## Operate

```bash
export PATH="$HOME/.local/bin:$PATH"
export NOTION_API_TOKEN=ntn_...   # PAT with the Workers capability
export NOTION_WORKSPACE_ID=55aac20e-f03b-81d9-ae38-000340f579e5

npm run check                     # type-check
npm test                          # read-only smoke tests (local)
ntn workers deploy --name focuslab-cms --yes
ntn workers env set NOTION_API_TOKEN=ntn_...
ntn workers capabilities list
ntn workers sync status siteMonitorSync --no-watch
ntn workers sync trigger siteMonitorSync
ntn workers webhooks list
```

`ntn workers deploy` does not reset sync state. Use
`ntn workers sync state reset siteMonitorSync` to restart from scratch.