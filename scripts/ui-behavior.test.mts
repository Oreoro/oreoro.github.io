import assert from "node:assert/strict";
import test from "node:test";
import { normalizeSearchText } from "../src/scripts/list-filter.ts";
import { buildEmailRequestHref } from "../src/scripts/email-request.ts";

test("search ignores case and repeated whitespace", () => {
	assert.equal(normalizeSearchText("  Product   FIRST\n "), "product first");
});

test("search treats curly quotes like typed quotes", () => {
	assert.equal(normalizeSearchText("Maker’s Schedule"), "maker's schedule");
});

test("search matches accented author names without the accent", () => {
	assert.equal(normalizeSearchText("José Müller"), "jose muller");
});

test("an empty search leaves no filtering terms", () => {
	assert.deepEqual(normalizeSearchText("  ").split(" "), [""]);
});

test("email requests encode the subject and body independently", () => {
	const href = buildEmailRequestHref(
		"studio@example.com",
		"Jobs & policy updates",
		"Please send job updates.",
		" reader+jobs@example.com ",
	);
	const url = new URL(href);
	assert.equal(url.protocol, "mailto:");
	assert.equal(url.pathname, "studio@example.com");
	assert.equal(url.searchParams.get("subject"), "Jobs & policy updates");
	assert.equal(
		url.searchParams.get("body"),
		"Please send job updates.\n\nPlease send updates to: reader+jobs@example.com",
	);
});

test("no-JavaScript draft invites the visitor to add their address", () => {
	const url = new URL(
		buildEmailRequestHref("studio@example.com", "Updates", "Please send updates."),
	);
	assert.equal(
		url.searchParams.get("body"),
		"Please send updates.\n\nPlease send updates to: [add your email address]",
	);
});

test("email request contents cannot inject query parameters", () => {
	const url = new URL(
		buildEmailRequestHref(
			"studio@example.com",
			"Updates",
			"Request &cc=elsewhere",
			"a+b@example.com",
		),
	);
	assert.equal(url.searchParams.get("cc"), null);
	assert.equal(
		url.searchParams.get("body"),
		"Request &cc=elsewhere\n\nPlease send updates to: a+b@example.com",
	);
});

test("separate forms produce independent drafts", () => {
	const jobs = new URL(
		buildEmailRequestHref("studio@example.com", "Jobs", "Job notifications", "jobs@example.com"),
	);
	const policies = new URL(
		buildEmailRequestHref(
			"studio@example.com",
			"Policies",
			"Policy updates",
			"policies@example.com",
		),
	);
	assert.equal(jobs.searchParams.get("subject"), "Jobs");
	assert.equal(policies.searchParams.get("subject"), "Policies");
	assert.match(jobs.searchParams.get("body")!, /jobs@example\.com$/);
	assert.match(policies.searchParams.get("body")!, /policies@example\.com$/);
});
