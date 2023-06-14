import Swiper, { A11y } from 'swiper';

// Configure Swiper to use modules
Swiper.use([A11y]);

const swiperTranstornos = new Swiper('.swiper-transtornos', {
	slidesPerView: 1.3,
	spaceBetween: 24,
	centeredSlides: true,
	centeredSlidesBounds: true,
	breakpoints: {
		768: {
			slidesPerView: 4,
			centeredSlidesBounds: false,
			spaceBetween: 32,
		},
	},
});
