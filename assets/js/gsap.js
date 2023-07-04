/*
 * GSAP ScrollTrigger
 * @see https://greensock.com/docs/v3/Plugins/ScrollTrigger
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray('.panel');
let currentSection = sections[0];

gsap.defaults({ overwrite: 'auto', duration: 1.3 });

// stretch out the body height according to however many sections there are.
gsap.set('body', { height: sections.length * 100 + '%' });

// create a ScrollTrigger for each section
sections.forEach((section, i) => {
	ScrollTrigger.create({
		// use dynamic scroll positions based on the window height (offset by half to make it feel natural)
		trigger: '#test',
		pin: true,
		start: (self) => (i === 0 ? 'top top' : self.previous().end),
		end: () => '+=' + innerHeight,
		scrub: true,
		markers: true,
		toggleActions: 'restart none reverse reset',
		// when a new section activates (from either direction), set the section accordingly.
		onToggle: (self) => self.isActive && setSection(section),
	});
});

function setSection(newSection) {
	if (newSection !== currentSection) {
		gsap.timeline().to(currentSection, { autoAlpha: 0, duration: 0 });

		gsap.timeline().to(newSection, { autoAlpha: 1, duration: 0 });

		currentSection = newSection;
	}
}
