import crypto from "node:crypto";
import { Worker, WebhookVerificationError } from "@notionhq/workers";
import { triggerDeploy } from "./deploy.js";

/**
 * Optional shared secret. When set, callers must send it in the
 * `x-focuslab-secret` header. When unset, the unguessable webhook URL itself is
 * the only credential.
 */
function verifySharedSecret(headers: Record<string, string>): void {
	const secret = process.env.WEBHOOK_SHARED_SECRET;
	if (!secret) return;
	const provided = headers["x-focuslab-secret"] ?? "";
	const expected = Buffer.from(secret);
	const actual = Buffer.from(provided);
	if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) {
		throw new WebhookVerificationError("Invalid x-focuslab-secret header");
	}
}

export function registerWebhooks(worker: Worker) {
	worker.webhook("onDeployRequest", {
		title: "Rebuild focuslab.pk",
		description:
			"Receives a POST (from a Notion button, automation, or CI) and triggers a focuslab.pk rebuild. Body: { action: \"deploy\", reason?: string }.",
		execute: async (events) => {
			for (const event of events) {
				verifySharedSecret(event.headers);
				const body = event.body ?? {};
				const action = typeof body.action === "string" ? body.action : "deploy";
				const reason = typeof body.reason === "string" ? body.reason : "webhook";
				if (action !== "deploy") {
					console.log(`Ignoring webhook action "${action}" (delivery ${event.deliveryId}).`);
					continue;
				}
				const result = await triggerDeploy(reason);
				console.log(
					`Deploy webhook ${event.deliveryId}: triggered=${result.triggered} via=${result.via} — ${result.message}`,
				);
			}
		},
	});
}