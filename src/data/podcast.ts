/**
 * Podcasts we find useful — shows we actually listen to, not our own.
 *
 * Each entry links out to the show. The first entry is featured.
 */

export interface PodcastPick {
	show: string;
	title: string;
	url: string;
	note: string;
}

export const podcasts: PodcastPick[] = [
	{
		show: "37signals",
		title: "REWORK",
		url: "https://37signals.com/podcast",
		note: "Jason Fried and David Heinemeier Hansson on bootstrapping, staying small, and running a calm company. The show that shaped how we think about work.",
	},
	{
		show: "Wes Bos & Scott Tolinski",
		title: "Syntax",
		url: "https://syntax.fm",
		note: "Modern web development, practical and fast. A good way to keep up without reading every changelog.",
	},
	{
		show: "Dave Rupert & Chris Coyier",
		title: "ShopTalk Show",
		url: "https://shoptalkshow.com",
		note: "Front-end craft, accessibility, and the web platform — from two people who build for a living.",
	},
	{
		show: "Changelog Media",
		title: "The Changelog",
		url: "https://changelog.com/podcast",
		note: "Conversations with the people behind the open source and tools we depend on.",
	},
	{
		show: "Lenny Rachitsky",
		title: "Lenny's Podcast",
		url: "https://www.lennyspodcast.com",
		note: "Product leaders on strategy, growth, and building things people keep using.",
	},
	{
		show: "Ben Gilbert & David Rosenthal",
		title: "Acquired",
		url: "https://www.acquired.fm",
		note: "Long, careful histories of the companies and decisions behind great technology businesses.",
	},
	{
		show: "Software Engineering Daily",
		title: "Software Engineering Daily",
		url: "https://softwareengineeringdaily.com",
		note: "Interviews on the engineering behind real systems — useful when we are choosing a stack.",
	},
];
