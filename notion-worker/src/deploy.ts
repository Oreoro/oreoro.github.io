export interface DeployResult {
	triggered: boolean;
	via: "deploy-hook" | "github-workflow-dispatch" | "none";
	message: string;
}

/**
 * Rebuild the focuslab.pk site.
 *
 * Supports two mechanisms, checked in order:
 *  1. DEPLOY_HOOK_URL — a POST endpoint (Cloudflare Pages/Workers, Netlify,
 *     Vercel, etc.) that starts a new build.
 *  2. GitHub Actions workflow dispatch — GITHUB_DEPLOY_TOKEN +
 *     GITHUB_DEPLOY_REPO (owner/repo), with GITHUB_DEPLOY_WORKFLOW
 *     (default "astro.yml") and GITHUB_DEPLOY_REF (default "main").
 */
export async function triggerDeploy(reason?: string): Promise<DeployResult> {
	const hook = process.env.DEPLOY_HOOK_URL;
	if (hook) {
		const response = await fetch(hook, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ reason: reason ?? "focuslab worker", at: new Date().toISOString() }),
		});
		return {
			triggered: response.ok,
			via: "deploy-hook",
			message: `Deploy hook responded HTTP ${response.status}.`,
		};
	}

	const token = process.env.GITHUB_DEPLOY_TOKEN;
	const repo = process.env.GITHUB_DEPLOY_REPO;
	if (token && repo) {
		const workflow = process.env.GITHUB_DEPLOY_WORKFLOW ?? "astro.yml";
		const ref = process.env.GITHUB_DEPLOY_REF ?? "main";
		const response = await fetch(
			`https://api.github.com/repos/${repo}/actions/workflows/${workflow}/dispatches`,
			{
				method: "POST",
				headers: {
					authorization: `Bearer ${token}`,
					accept: "application/vnd.github+json",
					"content-type": "application/json",
					"user-agent": "focuslab-notion-worker",
				},
				body: JSON.stringify({ ref, inputs: { reason: reason ?? "" } }),
			},
		);
		return {
			triggered: response.ok,
			via: "github-workflow-dispatch",
			message: response.ok
				? `Dispatched ${repo} workflow ${workflow} on ${ref}.`
				: `GitHub dispatch failed with HTTP ${response.status}.`,
		};
	}

	return {
		triggered: false,
		via: "none",
		message:
			"No deploy trigger configured. Set DEPLOY_HOOK_URL, or GITHUB_DEPLOY_TOKEN + GITHUB_DEPLOY_REPO.",
	};
}