function slide() {
    const slideControlButtons = document.querySelectorAll(".swipper-pagination-bullet");
    const slideImage = document.querySelectorAll(".slide-show-character");
    const slideText = document.querySelectorAll(".slide-show-text");


    function slideChange(e) {
        clearInterval(timerCount);
        const selectedBulletIndex = e.target.getAttribute('tabindex');
        for (let i = 0; i < slideImage.length; i++) {
            if (selectedBulletIndex == i) {
                slideImage[i].classList.add("active");
                slideText[i].classList.add("active");
                activeButtonContoroller(i);
            }
            else {
                slideImage[i].classList.remove("active");
                slideText[i].classList.remove("active");
            }
        }
        loopSlide(5000)
    };


    function activeButtonContoroller(slideIndex) {
        for (let i = 0; i < slideControlButtons.length; i++) {
            slideControlButtons[i].classList.remove("active");
            if (slideControlButtons[i].getAttribute("tabindex") == slideIndex) {
                slideControlButtons[i].classList.add("active");
            }
        }

    }


    let timerCount;
    function loopSlide(time) {

        timerCount = setInterval(timer, time);

        function timer() {
            for (let i = 0; i < slideImage.length; i++) {
                if (!slideImage[i].classList.contains("active")) {
                    slideImage[i].classList.add("active");
                    slideText[i].classList.add("active");

                    activeButtonContoroller(i);
                } else {
                    slideImage[i].classList.remove("active");
                    slideText[i].classList.remove("active");


                }
            }
        }
    }

    loopSlide(5000);

    slideControlButtons.forEach(slideButton => {
        slideButton.addEventListener("click", slideChange)
    });

}

export default slide();