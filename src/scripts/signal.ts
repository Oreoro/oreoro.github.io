/**
 * Progressive shell behaviour. Content, links and the checkbox menu work
 * without this script. The enhanced menu manages focus; stream shortcuts
 * never replace visible previous and next links.
 */
function initNavigate(): void {
	const navigation = document.querySelector<HTMLElement>(".entry__navigation");
	if (!navigation) return;

	const interactive = (target: EventTarget | null) =>
		document.querySelector<HTMLInputElement>(".nav-active")?.checked ||
		(target instanceof Element &&
			target.closest("a, button, input, textarea, select, summary, [contenteditable]"));
	const navigate = (direction: "next" | "previous") => {
		const href = navigation.dataset[direction];
		if (href) window.location.assign(href);
	};

	document.addEventListener("keydown", (event) => {
		if (
			event.defaultPrevented ||
			event.altKey ||
			event.ctrlKey ||
			event.metaKey ||
			event.shiftKey ||
			interactive(event.target) ||
			window.getSelection()?.toString()
		)
			return;
		if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
			event.preventDefault();
			navigate(event.key === "ArrowRight" ? "next" : "previous");
		}
	});

	let start: { x: number; y: number; time: number } | undefined;
	document.addEventListener(
		"touchstart",
		(event) => {
			const touch = event.touches[0];
			start =
				event.touches.length === 1 && touch && !interactive(event.target)
					? { x: touch.clientX, y: touch.clientY, time: performance.now() }
					: undefined;
		},
		{ passive: true },
	);
	document.addEventListener(
		"touchcancel",
		() => {
			start = undefined;
		},
		{ passive: true },
	);
	document.addEventListener(
		"touchend",
		(event) => {
			const origin = start;
			start = undefined;
			const touch = event.changedTouches[0];
			if (!origin || !touch || interactive(event.target) || window.getSelection()?.toString())
				return;
			const dx = touch.clientX - origin.x;
			const dy = touch.clientY - origin.y;
			if (
				Math.abs(dx) > 100 &&
				Math.abs(dx) > Math.abs(dy) * 1.5 &&
				performance.now() - origin.time < 350
			) {
				navigate(dx < 0 ? "next" : "previous");
			}
		},
		{ passive: true },
	);
}

function initMobileNav(): void {
	const toggle = document.querySelector<HTMLInputElement>(".nav-active");
	if (!toggle) return;
	const background = document.querySelectorAll<HTMLElement>(
		"body > main, body > .footer, body > .skip-link, .header__brand, .header__links",
	);
	const label = document.querySelector<HTMLElement>(".nav__toggle-text");
	const sync = () => {
		toggle.setAttribute("aria-expanded", String(toggle.checked));
		toggle.setAttribute("aria-label", toggle.checked ? "Close menu" : "Open menu");
		if (label) label.textContent = toggle.checked ? "Close" : "Menu";
		background.forEach((element) => {
			element.inert = toggle.checked;
		});
	};
	const close = (returnFocus = true) => {
		if (!toggle.checked) return;
		toggle.checked = false;
		sync();
		if (returnFocus) toggle.focus();
	};
	toggle.addEventListener("change", sync);
	document.querySelector(".nav-underlay")?.addEventListener("click", () => close());
	sync();

	document.addEventListener("keydown", (event) => {
		if (!toggle.checked) return;
		if (event.key === "Escape") {
			event.preventDefault();
			close();
		} else if (event.key === "Tab") {
			const focusable = Array.from(
				document.querySelectorAll<HTMLElement>(".nav-active, .nav a[href]"),
			).filter((element) => element.getClientRects().length > 0);
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (!first || !last) return;
			const active = document.activeElement;
			if (!focusable.includes(active as HTMLElement)) {
				event.preventDefault();
				first.focus();
			} else if (event.shiftKey && active === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && active === last) {
				event.preventDefault();
				first.focus();
			}
		}
	});
	document.addEventListener("click", (event) => {
		if (event.target instanceof Element && event.target.closest(".nav a[href]")) close(false);
	});
	window.matchMedia("(min-width: 48.001em)").addEventListener("change", (query) => {
		if (query.matches) close(false);
	});
}

function ready(): void {
	initMobileNav();
	initNavigate();
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", ready, { once: true });
} else {
	ready();
}
