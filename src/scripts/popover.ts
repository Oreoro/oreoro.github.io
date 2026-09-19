interface FloatingUIDOM {
	computePosition: (
		reference: Element,
		floating: HTMLElement,
		options?: { middleware?: unknown[] },
	) => Promise<{ x: number; y: number }>;
	offset: (value: number) => unknown;
	shift: (options?: { padding?: number }) => unknown;
	flip: (options?: { padding?: number }) => unknown;
	autoUpdate: (reference: Element, floating: HTMLElement, update: () => void) => () => void;
}

interface Window {
	FloatingUIDOM: FloatingUIDOM;
}

window.addEventListener("load", function () {
	// Load floating-ui core first, then dom
	const coreScript = document.createElement("script");
	coreScript.src = "https://cdn.jsdelivr.net/npm/@floating-ui/core@1.7.3";
	coreScript.onload = function () {
		// Load dom after core is loaded
		const domScript = document.createElement("script");
		domScript.src = "https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.7.4";
		domScript.onload = initPopovers;
		document.head.appendChild(domScript);
	};
	document.head.appendChild(coreScript);
});

function initPopovers() {
	const { computePosition, offset, shift, flip, autoUpdate } = window.FloatingUIDOM;

	// State variables for popovers
	const smBreakpointQuery = window.matchMedia("(max-width: 639px)");
	const lgBreakpointQuery = window.matchMedia("(min-width: 1024px)");

	// Create the selector based on the device type
	function getPopoverSelector() {
		if (lgBreakpointQuery.matches) {
			// Enable popovers for footnotes in collection stream pages (no margin notes there)
			// Disable popovers for footnotes elsewhere (margin notes handle them)
			return "[data-popover-target]:not([data-margin-note]), .post-preview-full-container [data-margin-note][data-popover-target]";
		}

		if (smBreakpointQuery.matches) {
			// Disable popovers for link mentions on small screens
			return '[data-popover-target]:not([data-popover-type-lm="true"])';
		}

		return "[data-popover-target]";
	}

	let openPopovers: HTMLElement[] = [];
	let cleanupAutoUpdate = new Map<HTMLElement, () => void>();
	let hoverTimeouts = new Map<HTMLElement, ReturnType<typeof setTimeout>>();

	const getPopoverLevel = (el: Element | null) => {
		let level = 0;
		while (el && el.closest("[data-popover-target]")) {
			level++;
			el = el.parentElement;
		}
		return level - 1;
	};

	const hideAllPopovers = (level = 0) => {
		openPopovers.forEach((popoverEl) => {
			if (getPopoverLevel(popoverEl) >= level) {
				hidePopover(popoverEl);
			}
		});
	};

	const hidePopover = (popoverEl: HTMLElement) => {
		if (popoverEl) {
			popoverEl.style.visibility = "hidden";
			popoverEl.classList.add("hidden");
			popoverEl.style.opacity = "0";

			const cleanup = cleanupAutoUpdate.get(popoverEl);
			if (cleanup) {
				cleanup();
				cleanupAutoUpdate.delete(popoverEl);
			}
			const openPopoverIndex = openPopovers.indexOf(popoverEl);
			if (openPopoverIndex !== -1) {
				openPopovers.splice(openPopoverIndex, 1);
			}
		}
	};

	const addLeaveListeners = (triggerEl: HTMLElement, popoverEl: HTMLElement) => {
		triggerEl.addEventListener("mouseleave", () => {
			const timeoutId = setTimeout(() => {
				hidePopover(popoverEl);
			}, 100);
			hoverTimeouts.set(popoverEl, timeoutId);
		});

		popoverEl.addEventListener("mouseenter", () => {
			const timeoutId = hoverTimeouts.get(popoverEl);
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		});

		popoverEl.addEventListener("mouseleave", () => {
			hidePopover(popoverEl);
		});

		triggerEl.addEventListener("blur", () => {
			hidePopover(popoverEl);
		});
	};

	const createPopover = (triggerEl: HTMLElement) => {
		const popoverID = triggerEl.dataset.popoverTarget;
		const template = document.getElementById(`template-${popoverID}`);
		if (!(template instanceof HTMLTemplateElement)) return null;
		const firstChild = template.content.firstElementChild;
		if (!(firstChild instanceof HTMLElement)) return null;
		const popoverEl = firstChild.cloneNode(true) as HTMLElement;

		// Remove data-margin-note from footnotes inside popovers so they use popover behavior instead
		popoverEl.querySelectorAll("[data-margin-note]").forEach((footnote) => {
			footnote.removeAttribute("data-margin-note");
		});

		triggerEl.parentNode?.insertBefore(popoverEl, triggerEl.nextSibling);
		addLeaveListeners(triggerEl, popoverEl);
		return popoverEl;
	};

	const showPopover = (triggerEl: HTMLElement) => {
		const level = getPopoverLevel(triggerEl);
		hideAllPopovers(level);

		const popoverID = triggerEl.dataset.popoverTarget ?? "";
		let popoverEl = document.getElementById(popoverID);

		if (!popoverEl) {
			popoverEl = createPopover(triggerEl);
		}
		if (!popoverEl) return;

		const update = () => {
			computePosition(triggerEl, popoverEl, {
				middleware: [offset(6), shift({ padding: 3 }), flip({ padding: 3 })],
			}).then(({ x, y }) => {
				Object.assign(popoverEl.style, {
					left: `${x}px`,
					top: `${y}px`,
					position: "absolute",
				});
			});
		};

		update();
		popoverEl.classList.remove("hidden");
		requestAnimationFrame(() => {
			popoverEl.style.visibility = "visible";
			popoverEl.style.opacity = "1";
		});

		openPopovers.push(popoverEl);
		cleanupAutoUpdate.set(popoverEl, autoUpdate(triggerEl, popoverEl, update));
	};

	const handleHover = (event: Event) => {
		if (smBreakpointQuery.matches) return; // No hover on small screens

		const target = event.target;
		if (!(target instanceof Element)) return;

		const selector = getPopoverSelector();
		const triggerEl = target.closest(selector);
		if (triggerEl instanceof HTMLElement) {
			showPopover(triggerEl);
		}
	};

	document.addEventListener("mouseover", handleHover);
	document.addEventListener("focusin", handleHover);

	document.addEventListener("click", (event) => {
		const target = event.target;
		if (!(target instanceof Element)) return;

		const selector = getPopoverSelector();
		const triggerEl = target.closest(selector);

		if (triggerEl instanceof HTMLElement) {
			const href = triggerEl.dataset.href;

			if (href && !smBreakpointQuery.matches) {
				window.location.href = href;
				return;
			}

			if (smBreakpointQuery.matches) {
				event.preventDefault();
				showPopover(triggerEl);
				return;
			}
		}

		const popoverLink = target.closest("[data-popover-link]");
		if (popoverLink) {
			hideAllPopovers(-1);
		} else if (!triggerEl) {
			hideAllPopovers(-1);
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			hideAllPopovers(-1);
		}
	});
}
