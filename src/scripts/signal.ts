/**
 * Focus Lab shell behaviour, inspired by 37signals.com's stream navigation.
 *
 *  - Theme: the page colour is applied by the inline script in BaseHead before
 *    the first paint; initTheme keeps the browser chrome and the color-scheme
 *    in step with whatever ground settled.
 *  - Controller: the navigation dot can be dragged; releasing it over the origin
 *    ring snaps it home. Its position persists for the session.
 *  - Navigate: arrow keys and horizontal swipes move to the next/previous
 *    signal using the controller's data-next / data-previous attributes.
 */

import { palettes, DEFAULT_PALETTE } from "@/data/palettes";

const originEl = document.querySelector<HTMLElement>(".origin");
const controller = document.querySelector<HTMLElement>(".controller");

let controllerActive = false;
let controllerOffset: [number, number] = [0, 0];
let controllerTimeout: ReturnType<typeof setTimeout> | undefined;
let controllerPressed = false;
let controllerPadding = 0;

function overlap(): boolean {
	if (!controller || !originEl) return false;

	if (
		controller.offsetTop + controller.offsetHeight < originEl.offsetTop ||
		controller.offsetTop > originEl.offsetTop + originEl.offsetHeight ||
		controller.offsetLeft + controller.offsetWidth < originEl.offsetLeft ||
		controller.offsetLeft > originEl.offsetLeft + originEl.offsetWidth
	) {
		originEl.classList.remove("origin--overlap");
		return false;
	}

	if (!originEl.classList.contains("origin--overlap")) originEl.classList.add("origin--overlap");
	return true;
}

function initController() {
	if (!controller) return;

	const link = controller.querySelector<HTMLAnchorElement>("a");
	if (!link) return;

	controllerPadding = parseInt(getComputedStyle(link).getPropertyValue("padding")) || 0;

	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.attributeName === "style") {
				sessionStorage.setItem("controller_right", controller.style.right);
				sessionStorage.setItem("controller_bottom", controller.style.bottom);
			}
		});
	});

	observer.observe(controller, { attributes: true, attributeFilter: ["style"] });

	const storedRight = sessionStorage.getItem("controller_right");
	const storedBottom = sessionStorage.getItem("controller_bottom");
	if (storedRight && storedBottom) {
		controller.style.right = storedRight;
		controller.style.bottom = storedBottom;
	}

	link.onclick = () => {
		if (!controllerPressed) return false;
		return true;
	};

	controller.addEventListener("mousedown", (event) => {
		event.preventDefault();
		controllerActive = true;
		controllerPressed = true;
		controllerTimeout = setTimeout(() => {
			controllerPressed = false;
		}, 300);

		controllerOffset = [
			controller.offsetLeft + controller.offsetWidth - event.clientX,
			controller.offsetTop + controller.offsetHeight - event.clientY,
		];

		controller.classList.remove("controller--transition");
	});

	controller.addEventListener("mouseup", () => {
		controllerActive = false;
		clearTimeout(controllerTimeout);

		const controllerOverlap = overlap();

		if (controllerOverlap) {
			sessionStorage.removeItem("controller_right");
			sessionStorage.removeItem("controller_bottom");

			controller.removeAttribute("style");

			if (!controller.classList.contains("controller--transition"))
				controller.classList.add("controller--transition");
			if (!controller.classList.contains("controller--origin"))
				controller.classList.add("controller--origin");
		}
	});

	document.addEventListener("mousemove", (event) => {
		if (!controllerActive || !controller) return;

		const controllerX = window.innerWidth - (event.clientX + controllerOffset[0]);
		const controllerY = window.innerHeight - (event.clientY + controllerOffset[1]);

		if (
			controllerX >= -controllerPadding &&
			controllerX + controller.offsetWidth <= window.innerWidth + controllerPadding
		) {
			controller.style.right = controllerX + "px";
		} else if (controllerX <= -controllerPadding) {
			controller.style.right = -controllerPadding + "px";
		}

		if (
			controllerY >= -controllerPadding &&
			controllerY + controller.offsetHeight <= window.innerHeight + controllerPadding
		) {
			controller.style.bottom = controllerY + "px";
		} else if (controllerY <= -controllerPadding) {
			controller.style.bottom = -controllerPadding + "px";
		}

		overlap();
	});

	controller.classList.add("controller--loaded");
}

function resizeController() {
	if (!controller) return;
	const link = controller.querySelector<HTMLAnchorElement>("a");
	if (!link) return;

	controllerPadding = parseInt(getComputedStyle(link).getPropertyValue("padding")) || 0;

	if (controller.offsetLeft <= -controllerPadding) {
		let controllerResizeRight = window.innerWidth + controllerPadding - controller.offsetWidth;
		if (controllerResizeRight < -controllerPadding) controllerResizeRight = -controllerPadding;
		controller.style.right = controllerResizeRight + "px";
		sessionStorage.setItem("controller_right", controller.style.right);
	}

	if (controller.offsetTop <= -controllerPadding) {
		let controllerResizeBottom = window.innerHeight + controllerPadding - controller.offsetHeight;
		if (controllerResizeBottom < -controllerPadding) controllerResizeBottom = -controllerPadding;
		controller.style.bottom = controllerResizeBottom + "px";
		sessionStorage.setItem("controller_bottom", controller.style.bottom);
	}
}

function initNavigate() {
	if (!controller) return;

	let touchstartX = 0;
	let touchstartTime = 0;
	const isEditing = (target: EventTarget | null) =>
		document.querySelector<HTMLInputElement>(".nav-active")?.checked ||
		(target instanceof Element && target.closest("input, textarea, select, [contenteditable]"));

	document.addEventListener("touchstart", (event) => {
		const touch = event.touches[0];
		if (!touch) return;
		touchstartX = touch.pageX;
		touchstartTime = new Date().getTime();
	});

	document.addEventListener("touchend", (event) => {
		if (isEditing(event.target)) return;
		const touch = event.changedTouches[0];
		if (!touch) return;
		const touchendX = touch.pageX;
		const touchendTime = new Date().getTime();
		const touchmoveX = touchendX - touchstartX;

		if (Math.abs(touchmoveX) > 100 && touchendTime - touchstartTime < 300) {
			if (touchmoveX < 0) {
				window.location.assign(controller.getAttribute("data-next") || "");
			} else {
				window.location.assign(controller.getAttribute("data-previous") || "");
			}
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.defaultPrevented || isEditing(event.target)) return;
		if (event.key === "ArrowRight") {
			window.location.assign(controller.getAttribute("data-next") || "");
		} else if (event.key === "ArrowLeft") {
			window.location.assign(controller.getAttribute("data-previous") || "");
		}
	});
}

/**
 * Track the last input modality on <html>. Some browsers treat a clicked
 * <summary> as :focus-visible and paint the focus ring, so the stylesheet uses
 * this class to keep the ring for keyboard users and hide it after a pointer
 * click. Only navigation keys count as keyboard input, so typing or holding a
 * modifier does not flash the ring back on.
 */
const KEYBOARD_NAV_KEYS = new Set([
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

function initInputModality() {
	const root = document.documentElement;
	const usePointer = () => root.classList.add("pointer-focus");

	usePointer();
	document.addEventListener("pointerdown", usePointer, true);
	document.addEventListener(
		"keydown",
		(event) => {
			if (KEYBOARD_NAV_KEYS.has(event.key)) root.classList.remove("pointer-focus");
		},
		true,
	);
}

/**
 * signup.js — the email forms have no backend. Rather than post nowhere, they
 * compose a mailto with the address so a signup always does something useful
 * until a real endpoint is wired up.
 */
function initSignup() {
	document.querySelectorAll<HTMLFormElement>("form[data-signup]").forEach((form) => {
		form.addEventListener("submit", (event) => {
			event.preventDefault();

			const input = form.querySelector<HTMLInputElement>('input[type="email"]');
			const address = input?.value?.trim() ?? "";

			form.classList.remove("error");
			input?.removeAttribute("aria-invalid");

			// An empty or malformed address used to be silently dropped: the input
			// was focused and nothing else happened, so a keyboard user got no
			// reason for the failure and a mail client still opened for "abc".
			// Mark the field and say why.
			if (input && !input.checkValidity()) {
				form.classList.add("error");
				input.setAttribute("aria-invalid", "true");
				input.focus();
				return;
			}

			if (input && !address) return;

			const to = form.dataset.mailto || "";
			const subject = form.dataset.subject || "Focus Lab";
			const body = `Email: ${address}`;
			window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		});
	});
}

/**
 * theme.js — the page ground.
 *
 * The colour lives in CSS and the pre-paint script in BaseHead.astro has already
 * pointed `--rgb-theme` at one of the palette's grounds by the time this runs,
 * so the stylesheet is safe to read here. All that is left is to publish the
 * settled colour — the browser chrome and the color-scheme the controls and
 * scrollbars should follow. Content stays visible even if this script fails.
 *
 * The palette in play is whatever the pre-paint script resolved — the configured
 * default, or a `?palette=<id>` preview. The default has a single charcoal ground.
 */
function initTheme() {
	const root = document.documentElement;
	const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
	const schemeMeta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');

	// The scheme comes from the registry rather than from computed style. The
	// pre-paint script writes colorScheme as an inline value, which outranks the
	// `[data-palette]` rule, so reading it back would only ever return what we
	// last wrote.
	const palette = palettes.find(
		(entry) => entry.id === (root.getAttribute("data-palette") ?? DEFAULT_PALETTE),
	);
	root.style.colorScheme = palette?.scheme ?? "light";
	schemeMeta?.setAttribute("content", palette?.scheme ?? "light");

	// `--rgb-theme` is an `r, g, b` triple, so it can be handed to the meta tag
	// as-is once the reference to `--rgb-theme-N` has resolved.
	const ground = getComputedStyle(root).getPropertyValue("--rgb-theme").trim();
	if (ground) {
		root.setAttribute("data-theme", ground);
		if (meta) meta.setAttribute("content", `rgb(${ground})`);
	}

	document.body.classList.add("is-ready");
}

/**
 * The mobile sheet is a checkbox, so CSS opens it but nothing owns it. That
 * left three gaps worth closing here: aria-expanded had to be kept in step by
 * hand, Escape did nothing, and a keyboard user who opened the sheet had no
 * way back to the control that opened it. Also stops the page behind from
 * scrolling, which `overflow: hidden` alone does not do for touch on iOS.
 */
function initMobileNav() {
	const toggle = document.querySelector<HTMLInputElement>(".nav-active");
	if (!toggle) return;

	const open = () => toggle.checked;
	const background = document.querySelectorAll<HTMLElement>(
		"body > main, body > .header, body > .footer, body > .skip-link",
	);
	const sync = () => {
		toggle.setAttribute("aria-expanded", String(open()));
		background.forEach((element) => {
			element.inert = open();
		});
	};

	const close = () => {
		if (!toggle.checked) return;
		toggle.checked = false;
		// Assigning .checked does not fire `change`, so aria-expanded would
		// otherwise still read "true" on a closed sheet.
		sync();
		toggle.focus();
	};

	toggle.addEventListener("change", sync);
	sync();

	document.addEventListener("keydown", (event) => {
		if (!open()) return;

		if (event.key === "Escape") {
			event.preventDefault();
			close();
			return;
		}

		// The sheet is a modal surface, so Tab has to stay inside it. Without
		// this, tabbing walks off the last link and into the page behind, which
		// is hidden behind the backdrop and cannot be read.
		if (event.key === "Tab") {
			const focusable = Array.from(
				document.querySelectorAll<HTMLElement>(".nav-active, .nav a[href]"),
			).filter((el) => el.getClientRects().length > 0);
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

	// Following a link out of the sheet, or a resize up to the desktop layout
	// where the sheet is display:none, must not strand the page scroll-locked.
	document.addEventListener("click", (event) => {
		if (open() && (event.target as HTMLElement)?.closest(".nav a[href]")) {
			toggle.checked = false;
			sync();
		}
	});

	window
		.matchMedia("(min-width: 64em) and (hover: hover) and (pointer: fine)")
		.addEventListener("change", (query) => {
			if (query.matches) {
				toggle.checked = false;
				sync();
			}
		});
}

function ready() {
	initController();
	initNavigate();
	initSignup();
	initInputModality();
	initMobileNav();
	initTheme();
}

function load() {
	if (controller && !controller.classList.contains("controller--loaded")) {
		controller.classList.add("controller--loaded");
	}
}

/**
 * scroll.js — signal detail pages. Moves the expanded `.signal--clone`
 * content into the matching `.signal` in the cluster and scrolls to it.
 */
function initScroll() {
	const clone = document.querySelector<HTMLElement>(".signal--clone");
	if (!clone) return;

	const cluster = document.querySelector<HTMLElement>(".cluster");
	if (!cluster) return;

	const signalIndex = parseInt(clone.getAttribute("data-signal") || "0", 10);
	const signalElement = cluster.querySelectorAll<HTMLElement>(".signal").item(signalIndex);
	if (!signalElement) return;

	signalElement.replaceChildren(...Array.from(clone.children));
	signalElement.classList.add("signal--select");
	clone.remove();
	cluster.classList.add("cluster--loaded");

	if (window.matchMedia("(min-width: 64em) and (hover: hover) and (pointer: fine)").matches) {
		const boundary = document.querySelector<HTMLElement>(".boundary");
		const boundaryHeight = boundary
			? parseInt(getComputedStyle(boundary, ":before").getPropertyValue("height")) || 0
			: 0;
		const clusterHeight = cluster.offsetHeight;
		const clusterOffset = cluster.offsetTop;
		const clusterArea = window.innerHeight - clusterOffset;

		const signalOffset = signalElement.offsetTop - clusterOffset;
		const signalSpace = clusterHeight - signalOffset;
		const signalPadding = clusterArea - signalSpace - boundaryHeight;

		if (signalPadding > 0) cluster.style.paddingBottom = signalPadding + "px";

		window.scrollTo(0, signalOffset);
	}
}

window.addEventListener("resize", resizeController);
window.addEventListener("load", () => {
	load();
	initScroll();
});

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}
