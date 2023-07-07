/*
 * GSAP ScrollTrigger
 * @see https://greensock.com/docs/v3/Plugins/ScrollTrigger
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Scroll Scenes
const scenes = gsap.utils.toArray('.scene');

// Set scenes height
const scenesHeight = (scenes.length - 1) * 100 + '%';

// Scenes Timeline
const scenesTimeline = gsap.timeline({
	scrollTrigger: {
		trigger: '.scenes__items',
		pin: '.scenes',
		start: 'top top',
		end: `+=${scenesHeight}`,
		scrub: 0.75,
	},
});

// Set scenes wrapper to absolute
// gsap.set(scenes, { position: 'absolute', top: 0 });

// ScrollTrigger for header pinning
// ScrollTrigger.create({
// 	trigger: '.scenes',
// 	start: 'top top',
// 	endTrigger: '.scenes',
// 	end: `+=${scenesHeight}`,
// 	pin: 'header',
// });

// Loop over scenes
scenes.forEach(function (elem, i) {
	if (i != 0) {
		// Scene Enter animations
		scenesTimeline.from(elem.querySelector('.scene__inner'), { autoAlpha: 0 }, i);
	}

	// Scene Exit animations
	if (i != scenes.length - 1) {
		scenesTimeline.to(elem.querySelector('.scene__inner'), { autoAlpha: 0 }, i + 0.9);
	}
});

// As first scene is already visible on page load, the second scene is taking more time to enter.
// So we need to add a delay to the first scene exit animation.
// scenesTimeline.to(scenes[0].querySelector('.scene__inner'), { autoAlpha: 0, duration: 0.5 }, 0.1);
