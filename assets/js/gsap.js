/*
 * GSAP ScrollTrigger
 * @see https://greensock.com/docs/v3/Plugins/ScrollTrigger
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scenesElement = document.querySelector('.scenes');

if (scenesElement) {
	// Scroll Scenes
	const scenes = gsap.utils.toArray('.scene');

	// Set scenes height
	const scenesHeight = (scenes.length - 1) * 100 + '%';

	// Scenes Timeline
	const scenesTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: '.scenes__items',
			pin: '.scenes',
			start: 'center center',
			end: `+=${scenesHeight}`,
			scrub: 0.75,
		},
	});

	// Set scenes wrapper to absolute
	gsap.set(scenes, { position: 'absolute', top: 0 });

	// ScrollTrigger for header pinning
	ScrollTrigger.create({
		trigger: '.scenes',
		start: 'top top',
		endTrigger: '.scenes',
		end: `+=${scenesHeight}`,
		pin: 'header',
	});

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

	// Make the duration of last scene longer
	scenesTimeline.to(scenes[scenes.length - 1].querySelector('.scene__inner'), { autoAlpha: 1, duration: 1 });
}