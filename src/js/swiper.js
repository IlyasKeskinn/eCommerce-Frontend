const mySwiper = document.querySelector(".mySwiper");
const swiperPagination = document.querySelector(".swiper-pagination");
const swiperButtonNext = document.querySelector(".swiper-button-next");
const swiperButtonPrev = document.querySelector(".swiper-button-prev");


var swiper = new Swiper(mySwiper, {
    // If we need pagination
    pagination: {
        el: swiperPagination,
    },

    // Navigation arrows
    navigation: {
        nextEl: swiperButtonNext,
        prevEl: swiperButtonPrev,
    },
    loop: true,
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
        el: swiperPagination,
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 50,
        },
    },
});


