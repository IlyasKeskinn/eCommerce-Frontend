import { addItem } from "../cart.js";

import {comment} from "./comments.js";

function loadProductDetails() {

    const productWrapper = document.querySelector(".product-single-wrapper");

    const productID = localStorage.getItem("productId") ? JSON.parse(localStorage.getItem("productId")) : null;

    const products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : localStorage.setItem("products", []);

    const galleryThumbImages = document.querySelectorAll(".gallery-thumbs__img");

    const singleImage = document.querySelector(".single-img");

    const addCartBtn = document.querySelector(".btn-addtocart ");

    const productQuantity = document.querySelector(".quantity-control__number");

    comment(productID);
    //product gallery

    galleryThumbImages[0].classList.add("active");
    singleImage.src = galleryThumbImages[0].src;

    galleryThumbImages.forEach((img, index) => {
    img.addEventListener("click", function () {
        galleryThumbImages.forEach(image => {
            image.classList.remove("active");
        })
        img.classList.add("active");
        singleImage.src = img.src;
    })
})

    const findProduct = products.find((item) => item.id === Number(productID));
    if (productID !== null) {

        const productName = document.querySelector(".product-single__name");
        productName.textContent = findProduct.product_name;

        const productCurrentPrice = document.querySelector(".product-single__price .current_price");
        productCurrentPrice.textContent = `$${findProduct.price}`;


        let selectSize = '';
        let selectColor = '';
        let amount = Number(productQuantity.value);
        //size list & color list 
        document.addEventListener('DOMContentLoaded', function () {
            const sizeSwatchList = document.querySelector("#sizeSwatchList");
            const colorSwatchList = document.querySelector("#colorSwatchList");

            findProduct.size_options.forEach((size, index) => {
                //size list 
                const sizeInput = document.createElement("input");
                sizeInput.type = "radio";
                sizeInput.name = "size";
                sizeInput.id = `swatch-${index}`;
                const sizeLabel = document.createElement("label");
                sizeLabel.classList.add("swatch", "js-swatch", "text-uppercase");
                sizeLabel.setAttribute("for", `swatch-${index}`);
                sizeLabel.textContent = size;

                sizeSwatchList.appendChild(sizeInput);
                sizeSwatchList.appendChild(sizeLabel);

                if (index === 0) {
                    sizeInput.checked = true;
                    sizeLabel.classList.add("active");
                    selectSize = size;
                }
                
                sizeInput.addEventListener("change", function () {
                    document.querySelectorAll(".swatch.js-swatch").forEach((label) => {
                        label.classList.remove("active");
                    });
                    if (sizeInput.checked) {
                        sizeLabel.classList.add("active");
                        selectSize = size;
                    }
                });
            });
            //size list end

            //color list 

            findProduct.color_options.forEach((color, index) => {
                const colorInput = document.createElement("input");
                colorInput.type = "radio";
                colorInput.name = "color";
                colorInput.id = `color-swatch-${index}`;

                const colorLabel = document.createElement("label");
                colorLabel.classList.add("swatch", "swatch-color", "js-swatch");
                colorLabel.setAttribute("for", `color-swatch-${index}`);
                colorLabel.style.color = color;

                colorSwatchList.appendChild(colorInput);
                colorSwatchList.appendChild(colorLabel);

                if (index ===0) {
                    colorInput.checked = true;
                    colorLabel.classList.add("active");
                    selectColor = color
                }

                colorInput.addEventListener("change", function () {
                    document.querySelectorAll('.swatch-color.js-swatch').forEach((label) => {
                        label.classList.remove("active");
                    });
                    if (colorInput.checked) {
                        colorLabel.classList.add("active");
                        selectColor = color;
                    }

                })

            });
        });

        quantityControl(amount);

        addCartBtn.setAttribute("data-id", productID);

        addCartBtn.addEventListener("click", function (e) {
            e.preventDefault();
            amount = Number(productQuantity.value);
            addItem(e, amount,selectSize,selectColor);
            productQuantity.setAttribute("value", 1);
            quantityControl(Number(productQuantity.value));
        });

    }
}

function quantityControl(amount) {
    const incrementAmountBtn = document.querySelector(".quantity-control__increment");
    const reduceAmountBtn = document.querySelector(".quantity-control__reduce");
    const productQuantity = document.querySelector(".quantity-control__number");
    let newAmount = amount;
    incrementAmountBtn.addEventListener("click", (() => {
        newAmount = incrementAmount(newAmount);
        productQuantity.setAttribute("value", newAmount)
    }))
    reduceAmountBtn.addEventListener("click", (() => {
        newAmount = reduceAmount(newAmount);
        productQuantity.setAttribute("value", newAmount)
    }))


}


function incrementAmount(amount) {
    let newAmount = 1;
    if (amount < 100) {
        newAmount = amount + 1;
    } else {
        newAmount = amount;
    }
    return newAmount;
}

function reduceAmount(amount) {
    let newAmount = 1;

    if (amount > 1) {
        newAmount = amount - 1;
    } else {
        newAmount = amount;
    }
    return newAmount;
}

loadProductDetails();

