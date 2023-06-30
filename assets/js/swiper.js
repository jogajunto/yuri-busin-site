import Swiper, { A11y } from 'swiper';

// Configure Swiper to use modules
Swiper.use([A11y]);

const swiperTranstornos = new Swiper('.swiper-transtornos', {
	slidesPerView: 1.1,
	spaceBetween: 24,
	centeredSlides: true,
	centeredSlidesBounds: true,
	breakpoints: {
		768: {
			slidesPerView: 1.5,
			centeredSlidesBounds: false,
			spaceBetween: 32,
		},
		960: {
			slidesPerView: 2.5,
			centeredSlidesBounds: false,
			spaceBetween: 32,
		},
		1280: {
			slidesPerView: 3.5,
			centeredSlidesBounds: false,
			spaceBetween: 32,
		},
	},
});
