import Swiper, { Navigation, A11y, Pagination, Autoplay } from 'swiper';

Swiper.use([Navigation, A11y, Pagination, Autoplay]);

var swiper = new Swiper('.mySwiper', {
	slidesPerView: 1.3,
	spaceBetween: 24,
  centeredSlides: true,
  centeredSlidesBounds: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
  breakpoints: {
    768: {
      slidesPerView: 4,
      centeredSlidesBounds: false,
	    spaceBetween: 32,
    },
  }
});
