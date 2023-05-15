import MicroModal from 'micromodal';
import tabPanel from 'van11y-accessible-tab-panel-aria';

/**
 * Close details when clicking outside of it or pressing the escape key.
 */

const customCloseDetails = () => {
	const details = document.querySelectorAll("details[data-close-on-esc-or-click-outside='true']");

	// Close details when clicking outside of them
	window.addEventListener('click', (event) => {
		details.forEach((details) => {
			if (!details.contains(event.target)) {
				details.removeAttribute('open');
			}
		});
	});

	// Close details when pressing escape key
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			details.forEach((details) => {
				details.removeAttribute('open');
			});
		}
	});
};

document.addEventListener('DOMContentLoaded', customCloseDetails);

/**
 * Buttons.
 */

const animateLinksOnInteraction = () => {
	const clickableElements = document.querySelectorAll('button, a, input, select, textarea, summary, .tooltip');

	clickableElements.forEach((item) => {
		const handleHoverIn = () => {
			item.classList.add(`hover-in`);
			item.classList.remove(`hover-out`);
		};

		const handleHoverOut = () => {
			item.classList.remove(`hover-in`);
			item.classList.add(`hover-out`);
		};

		item.addEventListener('mouseenter', handleHoverIn);
		item.addEventListener('mouseleave', handleHoverOut);

		item.addEventListener('focusin', handleHoverIn);
		item.addEventListener('focusout', handleHoverOut);
	});
};

document.addEventListener('DOMContentLoaded', animateLinksOnInteraction);

/**
 * Tooltip.
 * Prevent the tooltip from appearing off-screen when the user clicks or hovers over it.
 */

const setTooltipPosition = () => {
	const tooltips = document.querySelectorAll('.tooltip');

	const handleTooltip = (element, event) => {
		element.classList.remove('tooltip--right');
		element.classList.remove('tooltip--center');

		if (event.pageX + 190 > window.innerWidth) {
			element.classList.add('tooltip--right');
		} else {
			element.classList.add('tooltip--center');
		}
	};

	tooltips.forEach((tooltip) => {
		tooltip.addEventListener('mouseenter', (event) => handleTooltip(tooltip, event));
		tooltip.addEventListener('click', (event) => handleTooltip(tooltip, event));
	});
};

document.addEventListener('DOMContentLoaded', setTooltipPosition);

/**
 * Homepage Tabs Animation.
 * Automatically switch between tabs.
 */

const screensTabAnimation = () => {
	const tabSection = document.querySelector('.bluy-screens');

	const tabNavLink = document.querySelectorAll('.bluy-screens__list__link');
	const tabNavItem = document.querySelectorAll('.bluy-screens__list__item');
	const tabContents = document.querySelectorAll('.bluy-screens__content');

	let currentTab = 0;
	let timeToNextTab = 4000;

	const handleTab = () => {
		tabContents.forEach((content, index) => {
			content.setAttribute('aria-hidden', index === currentTab ? 'false' : 'true');
		});

		tabNavLink.forEach((button, index) => {
			button.setAttribute('aria-selected', index === currentTab ? 'true' : 'false');
			button.setAttribute('tabindex', index === currentTab ? '0' : '-1');
		});

		tabNavItem.forEach((item, index) => {
			item.setAttribute('data-active', index <= currentTab ? 'true' : 'false');
		});
	};

	const activeNextTab = () => {
		if (currentTab < tabNavLink.length - 1) {
			currentTab++; // Update tab index each time the interval is called.
			handleTab(); // Activate current tab according to index
		}
	};

	// Always start with the first tab active even if there is a hash in the URL.
	handleTab();

	// Activate next tab after the timeToNextTab has passed.
	// let updateTabs = setInterval(activeNextTab, timeToNextTab);

	tabNavLink.forEach((button, index) => {
		button.addEventListener('click', () => {
			currentTab = index; // Update tab index when a tab is clicked.
			handleTab(); // Activate current tab according to index
			// clearInterval(updateTabs); // Stop the interval when a tab is clicked.
		});
	});
};

document.addEventListener('DOMContentLoaded', screensTabAnimation);

/**
 * Input Phone Number Mask
 * Automatically mask the phone number input field.
 * Expected mask: (00) 0000-0000 or (00) 00000-0000
 */

const phoneNumberMask = () => {
	const inputPhone = document.querySelectorAll('[type="tel"]');

	const createMask = (value) => {
		value = value.replace(/\D/g, ''); // Removes everything that is not a digit.
		value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Place parentheses around the first two digits.
		value = value.replace(/(\d)(\d{4})$/, '$1-$2'); // Put a hyphen between the fourth and fifth digits.
		return value;
	};

	inputPhone.forEach((input) => {
		input.setAttribute('minlength', '14');
		input.setAttribute('maxlength', '15');

		input.addEventListener('keyup', () => {
			setTimeout(() => {
				input.value = createMask(input.value);
			}, 1);
		});
	});
};

document.addEventListener('DOMContentLoaded', phoneNumberMask);

/**
 * Acessible Modal
 * https://micromodal.vercel.app/
 */

MicroModal.init({
	disableFocus: true,
	disableScroll: true,

	onShow: (modal) => {
		// Add focus to input only if it exists.
		const firstInput = modal.querySelector('input');
		firstInput ? firstInput.focus() : null;

		// Disable scrolling when modal is open. Default library behaviour to disable scrolling not working in Safari.
		document.documentElement.style.overflow = 'hidden';

		// Add / Update the URL hash with the modal ID.
		window.location.hash = modal.id;
	},

	onClose: (modal) => {
		// Disable scrolling when modal is open. Default library behaviour to disable scrolling not working in Safari.
		document.documentElement.style.removeProperty('overflow');
	},
});

const openModalFromURL = () => {
	const hash = window.location.hash;

	if (hash) {
		const modal = document.querySelector(hash);
		modal ? MicroModal.show(modal.id) : null;
	}
};

document.addEventListener('DOMContentLoaded', openModalFromURL);

/**
 * Open modal if the users fill the form with as a candidate.
 * It's to avoid the user to fill the form and then realize that it's not for candidates.
 */

const openModalWhenCandidate = () => {
	const modal = document.querySelector('#formulario-exclusivo-para-empresas');
	const form = document.querySelector('#form-contato-para-empresas');

	if (form) {
		const formSelect = form.querySelector('#subject');
		const formEmail = form.querySelector('#email');

		// If the user selects the option "Sou candidato e preciso de ajuda", open the modal.
		formSelect.addEventListener('change', () => {
			if (formSelect.value === 'Sou candidato e preciso de ajuda') MicroModal.show(modal.id);
		});

		// If the user informs an e-mail that is not from a company, open the modal.
		formEmail.addEventListener('blur', () => {
			const email = formEmail.value;
			const emailRegex = /@(gmail|hotmail|yahoo|outlook|live)\.com$/;

			if (emailRegex.test(email)) MicroModal.show(modal.id);
		});
	}
};

document.addEventListener('DOMContentLoaded', openModalWhenCandidate);

/**
 * Was this content helpful?
 * Ask the user to leave a feedback. Once the user responds, a Google Analytics event is sent by Google Tag Manager.
 */

const contentFeedback = () => {
	const toggle = document.querySelector('[data-content-feedback-status]');
	const buttons = document.querySelectorAll('[data-content-feedback-button]');

	buttons.forEach((button) => {
		button.addEventListener('click', () => toggle.setAttribute('data-content-feedback-status', 'answered'));
	});
};

document.addEventListener('DOMContentLoaded', contentFeedback);

/**
 * Responsive menu
 */

const mainMenu = () => {
	const menu = document.querySelector('.nav');
	const menuToggle = document.querySelector('.nav__toggle');
	const menuLinks = document.querySelectorAll('.nav__list__link:not(summary)');
	const menuDetails = document.querySelectorAll('.nav__list__details');

	const closeMenuDialog = () => {
		menu.setAttribute('data-dialog', 'closed');
		menuToggle.setAttribute('aria-expanded', false);
		document.body.classList.remove('no-scroll');
	};

	const openMenuDialog = () => {
		menu.setAttribute('data-dialog', 'open');
		menuToggle.setAttribute('aria-expanded', true);
		document.body.classList.add('no-scroll');
	};

	const closeWithEscapeKey = () => {
		window.addEventListener('keydown', (event) => {
			if (event.code === 'Escape') closeMenuDialog();
		});
	};

	const handleMenu = () => {
		if (menu.getAttribute('data-dialog') === 'open') {
			closeMenuDialog();
		} else {
			openMenuDialog();
			closeWithEscapeKey();
		}
	};

	const closeMenuDetails = (details) => {
		details.removeAttribute('open');
	};

	window.addEventListener('resize', () => {
		if (window.innerWidth > 1040) closeMenuDialog();
	});

	document.addEventListener('click', (event) => {
		menuDetails.forEach((details) => {
			const isClickInside = details.contains(event.target);
			if (!isClickInside) closeMenuDetails(details);
		});
	});

	menuToggle.addEventListener('click', handleMenu);
	menuLinks.forEach((link) => link.addEventListener('click', closeMenuDialog));
};

document.addEventListener('DOMContentLoaded', mainMenu);

/**
 * Fade Slider
 */

const crossfadeImage = () => {
	let current = 0;
	let images = document.querySelectorAll('[data-crossfade-image]');

	if (images.length === 0) return;

	setInterval(() => {
		images.forEach((image) => (image.style.opacity = 0));
		current = current != images.length - 1 ? current + 1 : 0;
		images[current].style.opacity = 1;
	}, 5000);
};

document.addEventListener('DOMContentLoaded', crossfadeImage);
