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

		// Trigger on page load
		if (this.triggeronPageLoad) {
			this.handleTriggerOnPageLoad(this.triggerOnPageLoadDelay);
		}

		// Trigger on page scroll
		if (this.triggerOnScroll) {
			console.log(this.triggerOnScroll, this.triggerOnScrollPercentage);
			this.handleTriggerOnScroll(this.triggerOnScrollPercentage);
		}

		// Trigger on exit intent
		if (this.triggerOnExitIntent) {
			this.handleTriggerOnExitIntent(this.triggerOnExitIntentTimes);
		}
	}

	handleTriggerOnPageLoad(delay) {
		setTimeout(() => {
			this.open();
		}, delay * 1000);
	}

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
	 * A wrapper for the modal open method.
	 *
	 * @returns {void}
	 */
	open() {
		const modal = document.querySelector(`tp-modal`);
		if (modal) {
			modal.open();
		} else {
			console.warn("tp-modal not found inside easy-wp-modal.");
		}
	}
}

window.customElements.define("easy-wp-modal", Modal);
