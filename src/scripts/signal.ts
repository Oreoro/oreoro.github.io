/**
 * Progressive behaviour for the numbered stream and checkbox menu.
 * Content and visible previous/next links work without this script.
 */
const desktopQuery = "(min-width: 64em)";

function initController(): void {
	const controller = document.querySelector<HTMLElement>(".controller");
	const link = controller?.querySelector<HTMLAnchorElement>("a");
	const origin = document.querySelector<HTMLElement>(".origin");
	if (!controller || !link || !origin) return;

	const clampPosition = (right: number, bottom: number) => {
		const { width, height } = controller.getBoundingClientRect();
		const nextRight = Math.max(0, Math.min(right, window.innerWidth - width));
		const nextBottom = Math.max(0, Math.min(bottom, window.innerHeight - height));
		controller.style.right = `${nextRight}px`;
		controller.style.bottom = `${nextBottom}px`;
		return {
			left: window.innerWidth - nextRight - width,
			right: window.innerWidth - nextRight,
			top: window.innerHeight - nextBottom - height,
			bottom: window.innerHeight - nextBottom,
		};
	};
	try {
		const right = Number.parseFloat(sessionStorage.getItem("controller_right") ?? "");
		const bottom = Number.parseFloat(sessionStorage.getItem("controller_bottom") ?? "");
		if (Number.isFinite(right) && Number.isFinite(bottom)) clampPosition(right, bottom);
	} catch {
		// Storage may be unavailable; the dot still works in its default position.
	}

	let start: { id: number; x: number; y: number; right: number; bottom: number } | undefined;
	let dragged = false;
	link.addEventListener("pointerdown", (event) => {
		if (event.pointerType !== "mouse" || event.button !== 0) return;
		event.preventDefault();
		const bounds = controller.getBoundingClientRect();
		start = {
			id: event.pointerId,
			x: event.clientX,
			y: event.clientY,
			right: window.innerWidth - bounds.right,
			bottom: window.innerHeight - bounds.bottom,
		};
		dragged = false;
		controller.classList.remove("controller--transition");
		link.setPointerCapture(event.pointerId);
	});
	link.addEventListener("pointermove", (event) => {
		if (!start || event.pointerId !== start.id) return;
		const dx = event.clientX - start.x;
		const dy = event.clientY - start.y;
		if (Math.hypot(dx, dy) < 5 && !dragged) return;
		dragged = true;
		const ring = origin.getBoundingClientRect();
		const dot = clampPosition(start.right - dx, start.bottom - dy);
		origin.classList.toggle(
			"origin--overlap",
			dot.left < ring.right &&
				dot.right > ring.left &&
				dot.top < ring.bottom &&
				dot.bottom > ring.top,
		);
	});
	const finish = () => {
		if (!start) return;
		start = undefined;
		if (origin.classList.contains("origin--overlap")) {
			controller.style.removeProperty("right");
			controller.style.removeProperty("bottom");
			controller.classList.add("controller--transition");
		}
		origin.classList.remove("origin--overlap");
		try {
			if (controller.style.right && controller.style.bottom) {
				sessionStorage.setItem("controller_right", controller.style.right);
				sessionStorage.setItem("controller_bottom", controller.style.bottom);
			} else {
				sessionStorage.removeItem("controller_right");
				sessionStorage.removeItem("controller_bottom");
			}
		} catch {
			// Session persistence is optional.
		}
	};
	link.addEventListener("pointerup", finish);
	link.addEventListener("pointercancel", finish);
	link.addEventListener("click", (event) => {
		if (dragged) {
			event.preventDefault();
			dragged = false;
		}
	});
	window.addEventListener("resize", () => {
		if (!controller.style.right || !controller.style.bottom) return;
		clampPosition(
			Number.parseFloat(controller.style.right),
			Number.parseFloat(controller.style.bottom),
		);
	});
	controller.classList.add("controller--loaded");
}

function initNavigate(): void {
	const navigation = document.querySelector<HTMLElement>(".entry__navigation, .controller");
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
		"body > main, body > .header, body > .footer, body > .skip-link",
	);
	const sync = () => {
		toggle.setAttribute("aria-expanded", String(toggle.checked));
		toggle.setAttribute("aria-label", toggle.checked ? "Close menu" : "Open menu");
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
	window.matchMedia(desktopQuery).addEventListener("change", (query) => {
		if (query.matches) close(false);
	});
}

function initInputModality(): void {
	const root = document.documentElement;
	const navigationKeys = new Set([
		"Tab",
		"ArrowUp",
		"ArrowDown",
		"ArrowLeft",
		"ArrowRight",
		"Home",
		"End",
		"PageUp",
		"PageDown",
	]);
	const usePointer = () => root.classList.add("pointer-focus");
	usePointer();
	document.addEventListener("pointerdown", usePointer, true);
	document.addEventListener(
		"keydown",
		(event) => {
			if (navigationKeys.has(event.key)) root.classList.remove("pointer-focus");
		},
		true,
	);
}

function initScroll(): void {
	const clone = document.querySelector<HTMLElement>(".signal--clone");
	const cluster = document.querySelector<HTMLElement>(".cluster--signal");
	if (!clone || !cluster) return;
	const signalIndex = Number.parseInt(clone.dataset.signal ?? "", 10);
	const signal = cluster.querySelectorAll<HTMLElement>(".signal").item(signalIndex);
	if (!signal) return;

	signal.replaceChildren(...Array.from(clone.children));
	signal.classList.add("signal--select");
	clone.remove();
	cluster.classList.add("cluster--loaded");

	if (!window.matchMedia(desktopQuery).matches) return;
	const boundary = document.querySelector<HTMLElement>(".boundary");
	const boundaryHeight = boundary
		? Number.parseInt(getComputedStyle(boundary, ":before").height, 10) || 0
		: 0;
	const signalOffset = signal.offsetTop - cluster.offsetTop;
	const signalPadding =
		window.innerHeight - cluster.offsetTop - (cluster.offsetHeight - signalOffset) - boundaryHeight;
	if (signalPadding > 0) cluster.style.paddingBottom = `${signalPadding}px`;
	window.scrollTo({ top: signalOffset, behavior: "instant" });
}

function ready(): void {
	initInputModality();
	initMobileNav();
	initController();
	initNavigate();
}

if (document.readyState === "complete") {
	initScroll();
} else {
	window.addEventListener("load", initScroll, { once: true });
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", ready, { once: true });
} else {
	ready();
}
