// TODO: Move this to CarouselContainer if no other container is needed.

import { store, getContext, getElement } from '@wordpress/interactivity';
import { merge } from 'object-deep-merge';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// import '../../../../../node_modules/swiper/swiper.scss';

// import './style.scss';
// import '../QueryLoopCarousel/style.scss';

const { state, actions } = store("gridibleCarousel", {
  state: {
  },

  actions: {
  },

  callbacks: {
    init: () => {
      const context = getContext();
      console.log(`[gridibleCarousel.init] context:`, context)
      console.log(`[gridibleCarousel.init] Swiper:`, Swiper)
      const { ref } = getElement();
      console.log(`[gridibleCarousel.init] Root element:`, ref)

      const liveSwiperConfig = {
        // Enable modules
        modules: [Autoplay, Navigation, Pagination],

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      };

      const deProxiedSwiperConfig = JSON.parse(JSON.stringify(context.swiperConfig));
      const swiperConfig = merge(deProxiedSwiperConfig, liveSwiperConfig);
      console.debug('[gridibleCarousel.init] swiperConfig:', swiperConfig);
      console.debug('[gridibleCarousel.init] swiperConfig.pagination:', swiperConfig.pagination);

      const swiper = new Swiper(ref, swiperConfig);
      console.log(`[gridibleCarousel.init] Swiper instance:`, swiper, ' - config:', swiperConfig)
    },
  },
});
