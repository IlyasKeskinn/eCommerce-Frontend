function loadProductDetails() {

    const productWrapper = document.querySelector(".product-single-wrapper");

    const productID = localStorage.getItem("productId") ? JSON.parse(localStorage.getItem("productId")) : null;

    const products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : localStorage.setItem("products", []);

    const findProduct = products.find((item) => item.id === Number(productID));
    if (productID !== null) {
        let template = `
        <div class="product-row d-flex justify-content-between ">
        <div class="col-7 product-gallery">
            <div class="product-singe__imgwrapper">
                <img src="./img/product_simple/product_0.jpg" style="width: 674px; height: 674px;" alt="">
            </div>
            <div class="product-thumb swiper mySwiper2"> 
                <ul class="gallery-thumbs swiper-wrapper my-2">
                    <li class="swiper-slide">
                        <img class="active" src="./img/product_simple/product_0.jpg"
                            style="height: 104px; width: 104px;" class="img-fluid" alt="">
                    </li>
                    <li class="swiper-slide">
                        <img src="./img/product_simple/product_0-1.jpg" style="height: 104px; width: 104px;"
                            class="img-fluid" alt="">
                    </li>
                    <li class="swiper-slide">
                        <img src="./img/product_simple/product_0-2.jpg" style="height: 104px; width: 104px;"
                            class="img-fluid" alt="">
                    </li>
                    <li class="swiper-slide">
                        <img style="height: 104px; width: 104px;" src="./img/product_simple/product_0-3.jpg"
                            class="img-fluid" alt="">
                    </li>
                    <li class="swiper-slide">
                        <img style="height: 104px; width: 104px;" src="./img/product_simple/product_0-3.jpg"
                            class="img-fluid" alt="">
                    </li>
                    <li class="swiper-slide">
                        <img style="height: 104px; width: 104px;" src="./img/product_simple/product_0-3.jpg"
                            class="img-fluid" alt="">
                    </li>
                </ul>
                <div class="swiper-button swiper-button-prev"></div>
                <div class="swiper-button swiper-button-next"></div>
            </div>
        </div>
        <div class="col-5 ">
            <div class="product-info__wrapper">
                <div class="d-flex justify-content-between align-items-center my-5">
                    <div class="breadcrumb">
                        <a href="#" class="btn btn-outlined-half text-uppercase">Home</a>
                        <span class="fw-normal">/</span>
                        <a href="#" class="btn btn-outlined-half text-uppercase">Shirts</a>
                    </div>
                </div>
                <h1 class="c product-single__name text-uppercase fw-normal mt-5">
                    ${findProduct.product_name}
                </h1>
                <div class="product-card__review d-flex align-items-center ">
                    <div class="review-stars-group me-1 d-flex align-items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor"
                            class="bi bi-star-fill fill" viewBox="0 0 16 16">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor"
                            class="bi bi-star-fill fill" viewBox="0 0 16 16">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor"
                            class="bi bi-star-fill fill" viewBox="0 0 16 16">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor"
                            class="bi bi-star-fill fill" viewBox="0 0 16 16">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor"
                            class="bi bi-star-fill " viewBox="0 0 16 16">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                    </div>
                    <span class="reviews-note text-lowercase text-secondary">
                        8k+ reviews
                    </span>
                </div>
                <div class="product-single__price my-5">
                    <span class="current_price">$449</span>
                </div>
                <div class="product-single__short-desc my-5">
                    <p>

                    </p>
                </div>
                <form action="" name="addtocart-form my-5">
                    <div class="product-single__swatches">
                        <div class="product-swatch text-swatches ">
                            <span>Size</span>
                            <div class="swatch-list d-flex align-items-center ">
                                <input type="radio" name="size" id="swatch-1">
                                <label class="swatch js-swatch" for="swatch-1">XXS</label>
                                <input type="radio" name="size" id="swatch-2">
                                <label class="swatch js-swatch" for="swatch-2">XS</label>
                                <input type="radio" name="size" id="swatch-3">
                                <label class="swatch js-swatch" for="swatch-3">S</label>
                                <input type="radio" name="size" id="swatch-4" checked>
                                <label class="swatch js-swatch" for="swatch-4">M</label>
                                <input type="radio" name="size" id="swatch-5">
                                <label class="swatch js-swatch" for="swatch-5">L</label>
                                <input type="radio" name="size" id="swatch-6">
                                <label class="swatch js-swatch" for="swatch-6">XL</label>
                                <input type="radio" name="size" id="swatch-7">
                                <label class="swatch active js-swatch" for="swatch-7">XXL</label>
                            </div>
                            <a href="#" class="sizeguiedelink">Size Guide</a>
                        </div>
                        <div class="product-swatch color-swatches">
                            <span>Color</span>
                            <div class="swatch-list d-flex align-items-center ">
                                <input type="radio" name="size" id="swatch-8">
                                <label style="color: #222" class="swatch swatch-color js-swatch"
                                    for="swatch-8"></label>
                                <input type="radio" name="size" id="swatch-9">
                                <label style="color: red" class="swatch swatch-color js-swatch"
                                    for="swatch-9"></label>
                                <input type="radio" name="size" id="swatch-10">
                                <label style="color: purple" class="swatch swatch-color js-swatch"
                                    for="swatch-10"></label>
                            </div>
                        </div>
                    </div>
                    <div class="product-single__addcart d-flex align-items-center ">
                        <div class="quantity-control position-relative">
                            <input type="number" name="quantity" class="quantity-control__number text-center"
                                value="1" min="1">
                            <a class="quantity-control__reduce">-</a>
                            <div class="quantity-control__increment">+</div>
                        </div>
                        <button type="submit"
                            class="button btn-primary text-uppercase btn-addtocart js-open-aside">Add To
                            Cart</button>
                    </div>
                </form>
                <div class="product-single__links d-flex align-items-center justify-content center my-5">
                    <a href="#"
                        class="btn btn-outlined-half d-flex align-items-center justify-content-between ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                            class="bi bi-heart" viewBox="0 0 16 16">
                            <path
                                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                        <span class="fw-normal text-uppercase">ADD TO WISHLISTS</span>
                    </a>
                    <a href="#" class="btn btn-outlined-half d-flex align-items-center justify-content-between">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                            class="bi bi-share" viewBox="0 0 16 16">
                            <path
                                d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                        </svg>
                        <span class="fw-normal text-uppercase">Share</span>
                    </a>
                </div>
                <div class="product-single__metainfo my-5">
                    <div class="meta-item">
                        <label class="text-secondary">SKU: </label>
                        <span class="fw-norlam">N/A</span>
                    </div>
                    <div class="meta-item">
                        <label class="text-secondary">CATEGORIES: </label>
                        <span class="fw-norlam">Casual & Urban Wear, Jackets, Men</span>
                    </div>
                    <div class="meta-item">
                        <label class="text-secondary">TAGS: </label>
                        <span class="fw-norlam">biker, black, bomber, leather</span>
                    </div>

                </div>
            </div>
        </div>
    </div>
        
        
        `
        productWrapper.insertAdjacentHTML("afterbegin",template);
    }

}
loadProductDetails();