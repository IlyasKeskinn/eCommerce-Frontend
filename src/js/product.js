function productsFunc() {
    let products = JSON.parse(localStorage.getItem("products")) ? JSON.parse(localStorage.getItem("products")) : [];


    const productListAll = document.querySelector(".product-list");
    const productListNew = document.querySelector(".new-product-list");
    const productListBest = document.querySelector(".best-product-list");
    const productListTop = document.querySelector(".top-product-list");
    const limitedProductList = document.querySelector(".limited-product-list");


    const generatedProduct = function (product) {

        return `
        <div class="product-card">
        <div class="pc-img__wrapper">
            <a href="#">
                <img  src="./img/product${product.img}" alt="" class="pc__img ">
            </a>
            <button data-id="${product.id}" class="pc__addcart button btn-white w-50" id="addToCart">Add Cart</button>
        </div>
        <div class="pc-info position-relative mt-3 p-1">
            <p class="text-secondary pc__category">Dressers</p>
            <h6 class="pc__title">
                <a href="#">
                    ${product.product_name}
                </a>
            </h6>
            <div class="d-flex product-card__price">
                <span class="money price">$${product.price}</span>
            </div>
            <div class="product-card__review d-flex align-items-center justify-content center">
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
                <button class="pc__btn d-flex align-items-center justify-content center ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                        class="bi bi-heart" viewBox="0 0 16 16">
                        <path
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>
                </button>
            </div>
</div>
    
        `
    }



    let productCards = '';
    let limitedProduct = '';
    let newProduct = '';
    let bestProduct = '';
    let topProduct = '';
    products.forEach((product, index) => {
        productCards += generatedProduct(product)
            ;

        if (product.price > 25) {
            limitedProduct += `
            <div class="swiper-slide">
            ${generatedProduct(product)}
            </div>
        `
        }
        if (product.product_name.includes("c")) {
            newProduct += generatedProduct(product);
        }
        if (product.product_name.includes("a")) {
            bestProduct += generatedProduct(product);
        }
        if (product.price > 35) {
            topProduct += generatedProduct(product);
        }
    }
    );



    productListAll.innerHTML = productCards;
    productListNew.innerHTML = newProduct;
    productListBest.innerHTML = bestProduct;
    productListTop.innerHTML = topProduct;
    limitedProductList.innerHTML = limitedProduct;

}

async function getProducts() {

    const data = await fetch('./js/products.json');
    const products = await data.json();
    products ? localStorage.setItem("products", JSON.stringify(products)) : [];
}   
getProducts();

productsFunc();