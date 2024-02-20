const mySwiper = document.querySelector(".mySwiper");
const mySwiper2 = document.querySelector(".mySwiper2");
const swiperPagination = document.querySelector(".swiper-pagination");
const swiperButtonNext = document.querySelector(".swiper-button-next");
const swiperButtonPrev = document.querySelector(".swiper-button-prev");


var swiper1 = new Swiper(mySwiper, {
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


var swiper2 = new Swiper(mySwiper2, {
    direction: "horizontal",
    slidesPerView: 5,
    spaceBetween: 10,
    loop : true,
    // Navigation arrows
    navigation: {
        nextEl: swiperButtonNext,
        prevEl: swiperButtonPrev,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 5,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 5,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 10,
        },
    },
});




export { swiper1 }

export { swiper2 }
