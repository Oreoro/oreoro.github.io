export interface Episode {
	slug: string;
	title: string;
	date: string;
	summary: string;
	body: string[];
}

export const episodes: Episode[] = [
	{
		slug: "why-product-led",
		title: "Why product-led",
		date: "2026-09-16",
		summary:
			"Focus Lab is a product-led studio. We design, build, and run our own software, then partner with a small number of teams to do the same. In this episode we explain what that means and why we chose it.",
		body: [
			"Being product-led means we own the outcome. We ship software, watch how people use it, and fix what does not work. We are not a body shop that bills hours and walks away.",
			"That changes how we work. We keep the studio small, we run the products ourselves, and we only take on a handful of partners at a time. Urbanevents, Workproof, and Muxo are proof of the approach, not side projects.",
			"The constraint is deliberate. Fewer partners means more attention per partner, and running our own products keeps us honest about what shipping actually takes.",
		],
	},
	{
		slug: "building-urbanevents",
		title: "Building Urbanevents",
		date: "2026-09-02",
		summary:
			"Urbanevents handles events and ticketing end to end. We talk through the parts that were harder than expected and the parts we deliberately left out.",
		body: [
			"Ticketing looks simple until you deal with inventory, holds, refunds, and the moment a popular event sells out in seconds. We spent most of the early work on the booking path and the database underneath it.",
			"We run Urbanevents on Cloudflare, Node.js, and PostgreSQL, with Stripe for payments. Keeping the stack boring lets us move quickly and sleep at night.",
			"The harder call was what not to build. We skipped a dozen features that other platforms have. Every one we left out made the core product clearer.",
		],
	},
	{
		slug: "shipping-muxo",
		title: "Shipping Muxo",
		date: "2026-08-19",
		summary:
			"Muxo is one key for the whole stack: web search, scraping, LLM calls, storage, and email behind a single API. This episode is about the design decisions behind it.",
		body: [
			"Muxo started as an internal tool. We were wiring the same few capabilities into every project, so we built one key that covers all of them. Then we realized other teams had the same problem.",
			"We kept the interface small. One key, a short manifest, and a set of named capabilities. The work goes into reliability, not into a long list of options.",
			"Running an AI product means being plain about limits. Models fail, providers change, and costs move. We design for retries and clear errors instead of pretending the stack is stable.",
		],
	},
	{
		slug: "workproof-in-the-open",
		title: "Workproof in the open",
		date: "2026-08-05",
		summary:
			"Workproof is our work and proof tooling. We build it in the open with a small set of partners, and we share what that loop looks like.",
		body: [
			"Workproof came from a simple frustration: it is hard to show what actually happened on a project. We wanted a tool that records the work as it happens, not a report written after the fact.",
			"We build it alongside partners. They use early versions, tell us what is missing, and we ship the next cut. It is a tight loop, and it keeps the product honest.",
			"Building in the open also means saying no in public. Partners see the roadmap and see the tradeoffs. That trust is worth more than a polished launch.",
		],
	},
	{
		slug: "the-stack-we-chose",
		title: "The stack we chose",
		date: "2026-07-22",
		summary:
			"We use Shopify, Cloudflare, Framer, Astro, React, TypeScript, Node.js, PostgreSQL, Stripe, and OpenAI and Anthropic. This episode explains why.",
		body: [
			"Every tool in our stack earns its place. Shopify for commerce, Cloudflare for hosting and edge work, Astro and React for the front end, Node.js and PostgreSQL for the back end.",
			"We pick tools that are stable, well documented, and easy to hand over. A stack you can explain to a partner in an afternoon is worth more than a clever one.",
			"For AI we use OpenAI and Anthropic behind our own interfaces. We keep providers swappable so a model change is a config change, not a rewrite.",
		],
	},
	{
		slug: "working-with-a-small-studio",
		title: "Working with a small studio",
		date: "2026-07-08",
		summary:
			"What does it look like to partner with Focus Lab? We walk through how engagements start, how we scope, and what we expect from each other.",
		body: [
			"Most engagements start with a short conversation about the problem, not the feature list. We want to know what the product has to do and how we will know it works.",
			"We scope in small pieces. Each piece ships, gets used, and informs the next. You see progress early instead of waiting for a big reveal.",
			"We ask partners to stay close. Fast decisions come from direct access to the people who own the outcome, not from layers of handoffs.",
		],
	},
];
