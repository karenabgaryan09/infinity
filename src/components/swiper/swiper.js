const swiperInHomePage = new Swiper("#nft-swiper .swiper", {
    slidesPerView: 1,
    // slidesPerGroup:4,
    spaceBetween:30,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
    navigation: {
        nextEl: "#nft-swiper .next",
        prevEl: "#nft-swiper .prev",
    },
    breakpoints: {
        // when window width is >= 320px
        640: {
            //   width: 640,
            slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
            //   width: 768,
            slidesPerView: 3,
        },
        // 992: {
        //     slidesPerView: 4,
        // },
      }
});
