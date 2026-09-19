/**
 * Placeholder podcast episodes — replace titles and summaries with your own.
 */

export interface Episode {
	slug: string;
	title: string;
	date: string;
	summary: string;
	body: string[];
}

export const episodes: Episode[] = [
	{
		slug: "episode-one",
		title: "Episode One",
		date: "2026-01-15",
		summary: "Placeholder summary. Replace with your own copy.",
		body: ["Placeholder show notes. Replace with your own copy."],
	},
	{
		slug: "episode-two",
		title: "Episode Two",
		date: "2026-01-08",
		summary: "Placeholder summary. Replace with your own copy.",
		body: ["Placeholder show notes. Replace with your own copy."],
	},
	{
		slug: "episode-three",
		title: "Episode Three",
		date: "2026-01-01",
		summary: "Placeholder summary. Replace with your own copy.",
		body: ["Placeholder show notes. Replace with your own copy."],
	},
];