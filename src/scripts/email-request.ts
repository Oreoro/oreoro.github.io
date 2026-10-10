/** Build a draft only; no request is sent until the visitor sends it in their email app. */
export function buildEmailRequestHref(
	recipient: string,
	subject: string,
	request: string,
	email?: string,
): string {
	const body = email
		? `${request}\n\nPlease send updates to: ${email.trim()}`
		: `${request}\n\nPlease send updates to: [add your email address]`;
	return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Enhance only these forms, without global events or persisting entered addresses. */
export function initEmailRequests(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>("[data-email-request]").forEach((element) => {
		if (element.dataset.emailRequestReady === "true") return;

		const form = element.querySelector<HTMLFormElement>(".email-request__form");
		const input = element.querySelector<HTMLInputElement>(".email-request__input");
		const error = element.querySelector<HTMLElement>(".email-request__error");
		const status = element.querySelector<HTMLElement>(".email-request__status");
		const draft = element.querySelector<HTMLAnchorElement>("[data-email-request-draft]");
		const { recipient, subject, request } = element.dataset;
		if (!form || !input || !error || !status || !draft || !recipient || !subject || !request)
			return;

		element.dataset.emailRequestReady = "true";
		form.hidden = false;
		draft.hidden = true;

		const clearDraft = () => {
			draft.hidden = true;
			draft.href = buildEmailRequestHref(recipient, subject, request);
			status.textContent = "";
		};

		input.addEventListener("input", () => {
			clearDraft();
			input.setAttribute("aria-invalid", "false");
			error.hidden = true;
			error.textContent = "";
		});

		form.addEventListener("submit", (event) => {
			event.preventDefault();
			clearDraft();
			if (!input.validity.valid) {
				input.setAttribute("aria-invalid", "true");
				error.textContent = input.validity.valueMissing
					? "Enter your email address to prepare a request."
					: "Enter a valid email address, such as you@example.com.";
				error.hidden = false;
				status.textContent = "Please check your email address. No request has been sent.";
				input.focus();
				return;
			}

			input.setAttribute("aria-invalid", "false");
			error.hidden = true;
			error.textContent = "";
			draft.href = buildEmailRequestHref(recipient, subject, request, input.value);
			draft.hidden = false;
			status.textContent = "Draft ready. Open it and send the email to request updates.";
		});
	});
}
