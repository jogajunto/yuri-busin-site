/*
 * On load, get the header height size and set it as a CSS variable in the :root.
 * When the window is resized, update the CSS variable.
 */

const setHeaderHeight = () => {
	const headerHeight = document.querySelector('.header').offsetHeight;
	document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
};

window.addEventListener('load', setHeaderHeight);
window.addEventListener('resize', setHeaderHeight);

/*
 * Responsive menu.
 * Turn the menu into a dialog when the window is resized to a smaller size.
 */

const header = document.querySelector('.header');
const menuClickableElements = document.querySelectorAll('.nav a, .nav button, .nav summary');
const menuToggle = document.querySelector('.nav__toggle');
const menuLinks = document.querySelectorAll('.nav__list__link:not(summary)');
const menuDetails = document.querySelectorAll('.nav__list__details');
const firstFocusableElement = menuClickableElements[0];
const lastFocusableElement = menuClickableElements[menuClickableElements.length - 1];

// Toggle menu dialog state
const toggleMenuDialog = () => {
	const isOpen = header.getAttribute('data-menu') === 'open';
	header.setAttribute('data-menu', isOpen ? 'closed' : 'open');
	menuToggle.setAttribute('aria-expanded', !isOpen);
	document.body.classList.toggle('no-scroll', isOpen);
};

// Close menu dialog
const closeMenuDialog = () => {
	header.setAttribute('data-menu', 'closed');
	menuToggle.setAttribute('aria-expanded', false);
	document.body.classList.remove('no-scroll');
};

// Handle escape key press to close menu dialog
const handleEscapeKey = (event) => {
	if (event.code === 'Escape') {
		closeMenuDialog();
	}
};

// Close menu details if clicked outside
const closeMenuDetails = () => {
	menuDetails.forEach((details) => {
		details.removeAttribute('open');
	});
};

// Trap focus within the menu dialog
const trapFocus = (event) => {
	if (event.shiftKey && document.activeElement === firstFocusableElement) {
		// If Shift + Tab is pressed while focusing the first element, focus the last element
		event.preventDefault();
		lastFocusableElement.focus();
	} else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
		// If Tab is pressed while focusing the last element, focus the first element
		event.preventDefault();
		firstFocusableElement.focus();
	}
};

// Event listener for menu links click
const handleMenuLinkClick = () => {
	closeMenuDialog();
};

// Event listener for menu toggle click
const handleMenuToggleClick = () => {
	toggleMenuDialog();
};

// Event listener for window resize
const handleWindowResize = () => {
	if (window.innerWidth > 1040) {
		closeMenuDialog();
	}
};

// Initialize the menu functionality
const initializeMenu = () => {
	// Add event listeners
	menuToggle.addEventListener('click', handleMenuToggleClick);
	menuLinks.forEach((link) => link.addEventListener('click', handleMenuLinkClick));
	window.addEventListener('resize', handleWindowResize);
	window.addEventListener('keydown', handleEscapeKey);
	menuToggle.addEventListener('keydown', trapFocus);
	lastFocusableElement.addEventListener('keydown', trapFocus);
};

// Initialize the menu when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeMenu);