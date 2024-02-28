function getComment(productId) {
    const comments = localStorage.getItem("comments") ? JSON.parse(localStorage.getItem("comments")) : [];
    let productComments = [];
    productComments = comments.filter(comment => Number(comment.product_id) == Number(productId));

    const reviewTab = document.querySelector("#collections-tab-3-trigger");
    reviewTab.innerHTML = `Reviews (${productComments.length})`;

    const reviewList = document.querySelector(".review-list");

    reviewList.innerHTML = '';

    let listItem = '';
    productComments.forEach((comment) => {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < comment.comment_rate) {
                stars += `
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"
                fill="currentColor" class="bi bi-star-fill active" viewBox="0 0 16 16">
                <path
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
                `
            }
            else {
                stars += `
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"
                fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
                `
            }

        };
        listItem += `
        <li>
        <div class="review-info">
            <div class="name-area d-flex flex-column">
                <p class="text-start">${comment.comment_author}</p>
                <span class="text-secondary text-start">28.12.2024</span>
            </div>
            <div class="review-stars-group me-1 d-flex align-items-center ">
                ${stars}
            </div>
        </div>
        <div class="comment">
            <p class="text-secondary text-capitalize">${comment.comment_text}</p>
        </div>
    </li>
        `
    });

    reviewList.insertAdjacentHTML("afterbegin", listItem)


}


function addComment(productId) {

    const comments = localStorage.getItem("comments") ? JSON.parse(localStorage.getItem("comments")) : [];


    const submitButton = document.getElementById("addComment");
    const ratingStars = document.querySelectorAll(".select-star-rating svg");

    hoverRate();

    selectStar();


    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        const name = document.getElementById("nameTxt").value;
        const mail = document.getElementById("mailTxt").value;
        const commentText = document.getElementById("commentText").value;
        let activeStar = findActiveStar();
        let date = new Date();

        comment = {
            "Id": comments.length + 1,
            "product_id": productId,
            "comment_text": commentText,
            "comment_author": name,
            "comment_rate": activeStar,
            "date": date
        }

        comments.push(comment)

        localStorage.setItem("comments", JSON.stringify(comments));

        document.getElementById("nameTxt").value = '';
        document.getElementById("mailTxt").value = '';
        document.getElementById("commentText").value = '';
        ratingStars.forEach(star => {
            star.classList.remove("active");
        })
        comment = {};
        getComment(productId);
    })




}

function hoverRate() {
    const ratingStars = document.querySelectorAll(".select-star-rating svg");
    ratingStars.forEach((star, index) => {
        star.addEventListener("mouseenter", () => {
            for (let i = 0; i <= index; i++) {
                ratingStars[i].classList.add("is-overed");
            }
        });
    })

    ratingStars.forEach((star) => {
        star.addEventListener("mouseleave", () => {
            ratingStars.forEach(star => star.classList.remove("is-overed"))
        })
    });
}

function selectStar() {
    const ratingStars = document.querySelectorAll(".select-star-rating svg");

    ratingStars.forEach((star, index) => {
        star.addEventListener("click", () => {
            for (let i = 0; i <= index; i++) {
                ratingStars[i].classList.add("active");
            }
            for (let i = index + 1; i < ratingStars.length; i++) {
                ratingStars[i].classList.remove("active");
            }
        })
    })
}

function findActiveStar() {
    const ratingStars = document.querySelectorAll(".select-star-rating svg");

    let activeStar = 0;
    ratingStars.forEach((star, index) => {
        if (star.classList.contains("active")) {
            activeStar++;
        }
        else {
        }

    });
    return activeStar;
}


function comment(productId) {
    getComment(productId);
    addComment(productId);
}


export { comment };