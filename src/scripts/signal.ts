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

const origin = document.querySelector<HTMLElement>(".origin");
const controller = document.querySelector<HTMLElement>(".controller");

let controllerActive = false;
let controllerOffset: [number, number] = [0, 0];
let controllerTimeout: ReturnType<typeof setTimeout> | undefined;
let controllerPressed = false;
let controllerPadding = 0;

function overlap(): boolean {
	if (!controller || !origin) return false;

	if (
		controller.offsetTop + controller.offsetHeight < origin.offsetTop ||
		controller.offsetTop > origin.offsetTop + origin.offsetHeight ||
		controller.offsetLeft + controller.offsetWidth < origin.offsetLeft ||
		controller.offsetLeft > origin.offsetLeft + origin.offsetWidth
	) {
		origin.classList.remove("origin--overlap");
		return false;
	}

	if (!origin.classList.contains("origin--overlap")) origin.classList.add("origin--overlap");
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
		let controllerResizeRight =
			window.innerWidth + controllerPadding - controller.offsetWidth;
		if (controllerResizeRight < -controllerPadding) controllerResizeRight = -controllerPadding;
		controller.style.right = controllerResizeRight + "px";
		sessionStorage.setItem("controller_right", controller.style.right);
	}

	if (controller.offsetTop <= -controllerPadding) {
		let controllerResizeBottom =
			window.innerHeight + controllerPadding - controller.offsetHeight;
		if (controllerResizeBottom < -controllerPadding)
			controllerResizeBottom = -controllerPadding;
		controller.style.bottom = controllerResizeBottom + "px";
		sessionStorage.setItem("controller_bottom", controller.style.bottom);
	}
}

function initNavigate() {
	if (!controller) return;

	let touchstartX = 0;
	let touchstartTime = 0;

	document.addEventListener("touchstart", (event) => {
		touchstartX = event.touches[0].pageX;
		touchstartTime = new Date().getTime();
	});

	document.addEventListener("touchend", (event) => {
		const touchendX = event.changedTouches[0].pageX;
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
		if (event.keyCode === 39) {
			window.location.assign(controller.getAttribute("data-next") || "");
		} else if (event.keyCode === 37) {
			window.location.assign(controller.getAttribute("data-previous") || "");
		}
	});
}

function initTheme() {
	const themeOptions = [
		"--rgb-theme-1",
		"--rgb-theme-2",
		"--rgb-theme-3",
		"--rgb-theme-4",
		"--rgb-theme-5",
		"--rgb-theme-6",
		"--rgb-theme-7",
		"--rgb-theme-8",
		"--rgb-theme-9",
		"--rgb-theme-10",
		"--rgb-theme-11",
		"--rgb-theme-12",
	];

	const themeSession = sessionStorage.getItem("theme");
	const themeFilter = themeOptions.filter((theme) => theme !== themeSession);
	const themeArray = themeFilter.length > 0 ? themeFilter : themeOptions;
	const themeVariable = themeArray[Math.floor(Math.random() * themeArray.length)];

	sessionStorage.setItem("theme", themeVariable);

	document.documentElement.style.setProperty(
		"--rgb-theme",
		getComputedStyle(document.documentElement).getPropertyValue(themeVariable).trim(),
	);
	document.body.classList.add("is-ready");
}

function ready() {
	initController();
	initNavigate();
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