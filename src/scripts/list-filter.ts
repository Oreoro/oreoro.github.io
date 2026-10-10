/** Normalise quotes, accents and spacing, without changing the displayed text. */
export function normalizeSearchText(value: string): string {
	return value
		.normalize("NFKD")
		.replace(/\p{M}/gu, "")
		.replace(/[‘’]/g, "'")
		.toLocaleLowerCase("en")
		.replace(/\s+/g, " ")
		.trim();
}

/** Progressive enhancement. Every resource stays visible if JavaScript fails. */
export function initListFilters(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>("[data-filter-list]").forEach((list) => {
		if (list.dataset.filterReady === "true") return;
		const controls = list.querySelector<HTMLElement>("[data-filter-controls]");
		const input = list.querySelector<HTMLInputElement>("[data-filter-input]");
		const clear = list.querySelector<HTMLButtonElement>("[data-filter-clear]");
		const status = list.querySelector<HTMLElement>("[data-filter-status]");
		const empty = list.querySelector<HTMLElement>("[data-filter-empty]");
		if (!controls || !input || !clear || !status || !empty) return;

		const items = Array.from(list.querySelectorAll<HTMLElement>("[data-filter-item]")).map(
			(item) => ({
				element: item,
				text: normalizeSearchText(
					`${item.textContent ?? ""} ${item.closest<HTMLElement>("[data-filter-group]")?.dataset.filterGroup ?? ""}`,
				),
			}),
		);
		const groups = Array.from(list.querySelectorAll<HTMLElement>("[data-filter-group]"));
		const anchors = Array.from(list.querySelectorAll<HTMLAnchorElement>(".page__anchors a"));
		const noun = list.dataset.filterNoun ?? "item";
		const plural = list.dataset.filterPlural ?? `${noun}s`;

		const update = () => {
			const terms = normalizeSearchText(input.value).split(" ");
			let count = 0;
			items.forEach(({ element, text }) => {
				element.hidden = !terms.every((term) => text.includes(term));
				if (!element.hidden) count++;
			});
			groups.forEach((group) => {
				group.hidden = !Array.from(group.querySelectorAll<HTMLElement>("[data-filter-item]")).some(
					(item) => !item.hidden,
				);
			});
			anchors.forEach((anchor) => {
				const id = decodeURIComponent(anchor.hash.slice(1));
				const group = groups.find((group) => group.querySelector(`#${CSS.escape(id)}`));
				if (group && anchor.parentElement) anchor.parentElement.hidden = group.hidden;
			});
			empty.hidden = count !== 0;
			clear.hidden = input.value.length === 0;
			status.textContent = `${count} of ${items.length} ${items.length === 1 ? noun : plural}${input.value.trim() ? " match your search" : ""}.`;
		};

		list.dataset.filterReady = "true";
		controls.hidden = false;
		input.addEventListener("input", update);
		clear.addEventListener("click", () => {
			input.value = "";
			update();
			input.focus();
		});
		update();
	});
}
