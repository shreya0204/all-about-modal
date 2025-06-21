/**
 * External dependencies
 */
import "@travelopia/web-components/dist/modal";

/**
 * Modal class
 */
class Modal extends HTMLElement {
	/**
	 * Constructor
	 *
	 * @returns {void}
	 */
	constructor() {
		super();

		const modalId = this.getAttribute("modal-id");

		if (!modalId) {
			return;
		}

		this.visibleOn = this.getAttribute("visible-on") || "both";
		this.isMobile = window.matchMedia("(max-width: 767px)").matches;

		// Stop early if device does not match visibility rule
		if (
			(this.visibleOn === "desktop" && this.isMobile) ||
			(this.visibleOn === "mobile" && !this.isMobile)
		) {
			return;
		}

		this.triggeronPageLoad = this.getAttribute("trigger-on-page-load") === "1";
		this.triggerOnPageLoadDelay =
			parseInt(this.getAttribute("trigger-on-page-load-delay"), 10) || 3;
		this.triggerOnScroll = this.getAttribute("trigger-on-scroll") === "1";
		this.triggerOnScrollPercentage =
			parseInt(this.getAttribute("trigger-on-scroll-percentage"), 10) || 50;
		this.triggerOnExitIntent =
			this.getAttribute("trigger-on-exit-intent") === "1";
		this.triggerOnExitIntentTimes =
			parseInt(this.getAttribute("trigger-on-exit-intent-times"), 10) || 1;
		this.triggerOnClick = this.getAttribute("trigger-on-click") === "1";
		this.triggerOnHover = this.getAttribute("trigger-on-hover") === "1";
		this.triggerOnFocus = this.getAttribute("trigger-on-focus") === "1";
		this.triggerOnMouseLeave =
			this.getAttribute("trigger-on-mouse-leave") === "1";
		this.triggerScrollIntoView =
			this.getAttribute("trigger-scroll-into-view") === "1";
		this.triggerScrollIntoViewOffset =
			parseInt(this.getAttribute("trigger-scroll-into-view-offset"), 10) || 0;

		// Trigger on page load
		if (this.triggeronPageLoad) {
			this.handleTriggerOnPageLoad(this.triggerOnPageLoadDelay);
		}

		// Trigger on page scroll
		if (this.triggerOnScroll) {
			this.handleTriggerOnScroll(this.triggerOnScrollPercentage);
		}

		// Trigger on exit intent
		if (this.triggerOnExitIntent) {
			this.handleTriggerOnExitIntent(this.triggerOnExitIntentTimes);
		}

		// Trigger on click
		if (this.triggerOnClick) {
			this.addEventListener("click", () => {
				this.open();
			});
		}

		// Trigger on hover
		if (this.triggerOnHover) {
			this.addEventListener("mouseenter", () => {
				this.open();
			});
		}

		// Trigger on focus
		if (this.triggerOnFocus) {
			this.addEventListener("focus", () => {
				this.open();
			});
		}

		// Trigger on mouse leave
		if (this.triggerOnMouseLeave) {
			this.addEventListener("mouseleave", () => {
				this.open();
			});
		}

		// Trigger scroll into view
		if (this.triggerScrollIntoView) {
			this.handleScrollIntoView(this.triggerScrollIntoViewOffset);
		}
	}

	/**
	 * Handles the page load trigger by setting a timeout.
	 *
	 * @param {number} delay - The delay in seconds before the modal opens.
	 * @returns {void}
	 */
	handleTriggerOnPageLoad(delay) {
		setTimeout(() => {
			this.open();
		}, delay * 1000);
	}

	/**
	 * Handles the scroll trigger by adding a scroll event listener.
	 *
	 * @param {number} percentage - The percentage of the page to scroll before triggering the modal.
	 * @returns {void}
	 */
	handleTriggerOnScroll(percentage) {
		this.hasScrollTriggered = false;

		this.handleScroll = () => {
			const scrollPosition =
				(window.scrollY + window.innerHeight) /
				document.documentElement.scrollHeight;

			if (!this.hasScrollTriggered && scrollPosition >= percentage / 100) {
				this.open();
				this.hasScrollTriggered = true;
				window.removeEventListener("scroll", this.handleScroll);
			}
		};

		window.addEventListener("scroll", this.handleScroll);
	}

	/**
	 * Handles the exit intent trigger by listening for mouseout events.
	 *
	 * @param {number} times - The number of times to trigger the modal on exit intent.
	 * @returns {void}
	 */
	handleTriggerOnExitIntent(times) {
		let exitIntentCount = 0;

		document.addEventListener("mouseout", (event) => {
			if (event.clientY < 0) {
				exitIntentCount++;
				if (exitIntentCount <= times) {
					this.open();
				}
			}
		});
	}

	/**
	 * Handles the scroll into view event using IntersectionObserver.
	 *
	 * @param {number} offset - The offset in pixels to trigger the modal.
	 * @returns {void}
	 */
	handleScrollIntoView(offset) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.open();
						observer.disconnect();
					}
				});
			},
			{
				root: null,
				rootMargin: `${offset}px 0px 0px 0px`,
				threshold: 0.1,
			}
		);

		observer.observe(this);
	}

	/**
	 * A wrapper for the modal open method.
	 *
	 * @returns {void}
	 */
	open() {
		const modalId = this.getAttribute("modal-id");
		const modal = document.querySelector(`tp-modal[modal-id="${modalId}"]`);
		if (modal) {
			modal.open();
		} else {
			console.warn("tp-modal not found inside easy-wp-modal.");
		}
	}
}

window.customElements.define("easy-wp-modal", Modal);
