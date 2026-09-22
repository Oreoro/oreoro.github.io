/**
 * Focus Lab shell behaviour — a faithful port of 37signals.com's
 * theme.js, controller.js and navigate.js.
 *
 *  - Theme: a random colour from the 12-colour palette is applied on every
 *    load (avoiding an immediate repeat), then the page is revealed.
 *  - Controller: the white dot can be dragged; releasing it over the origin
 *    ring snaps it home. Its position persists for the session.
 *  - Navigate: arrow keys and horizontal swipes move to the next/previous
 *    signal using the controller's data-next / data-previous attributes.
 */

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

	document.addEventListener("touchstart", (event) => {
		const touch = event.touches[0];
		if (!touch) return;
		touchstartX = touch.pageX;
		touchstartTime = new Date().getTime();
	});

	document.addEventListener("touchend", (event) => {
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
		if (event.key === "ArrowRight") {
			window.location.assign(controller.getAttribute("data-next") || "");
		} else if (event.key === "ArrowLeft") {
			window.location.assign(controller.getAttribute("data-previous") || "");
		}
	});
}

/**
 * The theme is chosen and applied by the inline script in BaseHead, before the
 * first paint. All that is left here is to reveal the shell once the fonts and
 * the controller are in place, so the page fades in already wearing its colour.
 */
function initTheme() {
	document.body.classList.add("is-ready");
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
			if (input && !address) {
				input.focus();
				return;
			}

			const to = form.dataset.mailto || "";
			const subject = form.dataset.subject || "Focus Lab";
			const body = `Email: ${address}`;
			window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		});
	});
}

function ready() {
	initController();
	initNavigate();
	initSignup();
	initInputModality();
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

	if (window.innerWidth >= 1024) {
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

	if (!cluster.classList.contains("cluster--loaded")) cluster.classList.add("cluster--loaded");
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
