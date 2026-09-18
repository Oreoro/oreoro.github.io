#!/usr/bin/env bash
set -euo pipefail

# Read-only smoke tests. Safe to run repeatedly; nothing is written to Notion.
# Requires .env with NOTION_API_TOKEN (see .env.example).

export PATH="$HOME/.local/bin:$PATH"

echo "== focuslabPlaybook =="
ntn workers exec focuslabPlaybook --local -d '{}'

echo
echo "== listContent (published articles) =="
ntn workers exec listContent --local -d '{"type":"Article","published":true,"tag":null,"limit":5}'

echo
echo "== getContent =="
ntn workers exec getContent --local -d '{"slug":"shipping-ai-products","includeBody":true}'

echo
echo "== auditContent =="
ntn workers exec auditContent --local -d '{}'