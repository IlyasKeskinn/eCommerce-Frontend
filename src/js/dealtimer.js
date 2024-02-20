function dealTimer() {
    const countDownUnits = document.querySelectorAll(".countdown-unit");

    let timer = 10 * 24 * 60 * 60; // 10 days
    const countDown = setInterval(() => {

        let remainSecond = timer % 60;
        let minute = Math.floor(timer % (60 * 60) / 60);
        let hour = Math.floor(timer % (60 * 60 * 24) / (60 * 60));
        let day = Math.floor(timer / (60 * 60 * 24));

        countDownUnits[0].children[0].innerHTML = day < 10 ? `0${day}` : day;
        countDownUnits[1].children[0].innerHTML = hour < 10 ? `0${hour}` : hour;
        countDownUnits[2].children[0].innerHTML = minute < 10 ? `0${minute}` : minute;
        countDownUnits[3].children[0].innerHTML = remainSecond < 10 ? `0${remainSecond}` : remainSecond;

        if (timer < 1) {
            clearInterval(countDown);
        } else {
            timer--;
        }
    }, 1000);
}


dealTimer();