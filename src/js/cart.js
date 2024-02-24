import { UIControl } from "./aside_section.js";

const StorageController = (function () {

    return {
        storeCart: function (product, amount = 1, size = null, color = null) {
            let cart = [];
            if (localStorage.getItem("cart") === null) {
                cart = [];
                cart.push({ ...product });
            } else {
                cart = JSON.parse(localStorage.getItem("cart"));

                const isItemExits = cart.find((cartItem) =>
                    cartItem.id === product.id &&
                    cartItem.selected_size === size &&
                    cartItem.selected_color === color
                );

                if (isItemExits) {
                    cart.forEach((cartItem, index) => {
                        if (cartItem.id === product.id && cartItem.selected_size === size && cartItem.selected_color === color) {
                            const prd = {
                                ...product,
                                "amount": amount,
                                "selected_size": size !== null ? size : product.size_options[0],
                                "selected_color": color !== null ? color : product.color_options[0],
                                "cartId": cart.length + 1
                            };
                            cart.splice(index, 1, prd);
                        }
                    });
                } else {
                    cart.push({
                        ...product, "amount": amount,
                        "selected_size": size !== null ? size : product.size_options[0],
                        "selected_color": color !== null ? color : product.color_options[0],
                        "cartId": cart.length + 1
                    });
                }
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            return true;
        },

        getCart: function () {
            let cart;
            if (localStorage.getItem("cart") === null) {
                cart = [];

            } else {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            return cart;
        },
        getProducts: function () {
            let products;
            if (localStorage.getItem("products") === null) {
                products = [];
            } else {
                products = JSON.parse(localStorage.getItem("products"));
            }
            return products;
        },
        deleteProductToStorage: function (productId) {
            let cart = JSON.parse(localStorage.getItem("cart"));

            cart.forEach((product, index) => {
                if (product.id == Number(productId)) {
                    cart.splice(index, 1);
                }
            });
            localStorage.setItem("cart", JSON.stringify(cart));
        },
        updateCartAmount: function (e) {
            const dataId = e.target.dataset.id;
            const cartItemID = e.target.getAttribute("cart-id");
            const cart = this.getCart();
            let updatedPrd;
            let amount;
            cart.forEach((cartItem, index) => {
                if (cartItem.cartId === Number(cartItemID)) {
                    if (e.target.classList.contains("quantity-control__increment")) {
                        amount = this.incrementProductAmount(cartItem)
                    } else {
                        amount = this.reduceProductAmount(cartItem);
                    }
                    updatedPrd = { ...cartItem, "amount": Number(amount), "color": cartItem.selected_color, "size": cartItem.selected_size };
                    cart.splice(index, 1, updatedPrd);
                }
            });
            localStorage.setItem("cart", JSON.stringify(cart));

        },
        incrementProductAmount: function (cartItem) {
            let newAmount;
            if (cartItem.amount < 100) {
                newAmount = cartItem.amount + 1;
            } else {
                newAmount = cartItem.amount;
            }
            return newAmount;
        },
        reduceProductAmount: function (cartItem) {
            let newAmount;
            if (cartItem.amount > 1) {
                newAmount = cartItem.amount - 1;
            } else {
                newAmount = cartItem.amount;
            }
            return newAmount;

        },

    }
})();

const CartController = (function () {

    const data = {
        cart: StorageController.getCart(),
        amount: 0,
        subTotal: 0
    }

    return {
        getCart: function () {
            return data.cart;
        },
        initData: function () {
            this.calcTotal();
            this.cartAmount();
        },
        getData: function () {
            return data;
        },
        addedProduct: function (dataId, amount = 1, size = null, color = null) {
            const products = StorageController.getProducts();
            const findProduct = products.find((product) => product.id === Number(dataId));

            // Kontrolü id, size ve color üzerinden yap
            const isItemExits = data.cart.find((cartItem) =>
                cartItem.id === findProduct.id &&
                cartItem.selected_size === size &&
                cartItem.selected_color === color
            );

            let prd;

            if (isItemExits) {
                data.cart.forEach((cartItem, index) => {
                    if (cartItem.id === findProduct.id && cartItem.selected_size === size && cartItem.selected_color === color) {
                        prd = {
                            ...findProduct,
                            "amount": cartItem.amount + amount,
                            "selected_size": size !== null ? size : findProduct.size_options[0],
                            "selected_color": color !== null ? color : findProduct.color_options[0],
                            "cartId": data.cart.length + 1
                        };
                        data.cart.splice(index, 1, prd);
                    }
                });

            } else {
                prd = {
                    ...findProduct,
                    "amount": amount,
                    "selected_size": size !== null ? size : findProduct.size_options[0],
                    "selected_color": color !== null ? color : findProduct.color_options[0],
                    "cartId": data.cart.length + 1
                };
                data.cart.push(prd);
            }

            this.initData();
            return prd;
        },
        deleteProduct: function (productButton) {

            const dataId = productButton.target.dataset.id;
            data.cart.forEach((product, index) => {
                if (product.id == Number(dataId)) {
                    data.cart.splice(index, 1);
                    this.initData();
                }
            });
        },
        updateCartAmount: function (e) {
            const dataId = e.target.dataset.id;
            const cartId = e.target.getAttribute("cart-id");
            let updatedPrd;
            let amount;
            data.cart.forEach((cartItem, index) => {
                if (cartItem.cartId === Number(cartId)) {
                    if (e.target.classList.contains("quantity-control__increment")) {
                        amount = this.incrementProductAmount(cartItem)
                    } else {
                        amount = this.reduceProductAmount(cartItem);
                    }
                    updatedPrd = { ...cartItem, "amount": Number(amount), "color": cartItem.selected_color, "size": cartItem.selected_size };
                    data.cart.splice(index, 1, updatedPrd);
                }
            });
            this.calcTotal();
        },
        incrementProductAmount: function (cartItem) {
            let newAmount;
            if (cartItem.amount < 100) {
                newAmount = cartItem.amount + 1;
            } else {
                newAmount = cartItem.amount;
            }
            return newAmount;
        },
        reduceProductAmount: function (cartItem) {
            let newAmount;
            if (cartItem.amount > 1) {
                newAmount = cartItem.amount - 1;
            } else {
                newAmount = cartItem.amount;
            }
            return newAmount;

        },
        calcTotal: function () {
            let total = 0;
            data.cart.forEach(cartItem => {
                total += this.productTotal(cartItem);
            });
            data.subTotal = total;
        },
        cartAmount: function () {
            data.amount = data.cart.length;
        },
        productTotal: function (cartItem) {
            const cartItemTotal = cartItem.amount * cartItem.price;
            return cartItemTotal;

        }



    }


})();


const UIController = (function () {

    const Selectors = {
        "addToCartBtn": ".pc__addcart",
        "cartIcon": ".cart-amount",
        "shoppingCartAmount": ".shoping-cart-amount",
        "asideCartList": ".cart-drawer-item-list",
        "asideCartItem": ".cart-drawer-item",
        "removeBtn": ".remove-cart",
        "subTotal": ".sub-total-number",
        "shoppingPage": "#shopping-page",
        "cartPageItemlist": ".cart-item-list",
        "quantityControl": ".quantity-control"
    };

    const cart = CartController.getData().cart;

    return {
        getSelector: function () {
            return Selectors;
        },
        updateCartAmount: function (cartAmount) {
            const cartIcon = document.querySelectorAll(Selectors.cartIcon);
            const shoppingCartAmount = document.querySelector(Selectors.shoppingCartAmount);
            cartIcon.forEach(element => {
                element.innerHTML = cartAmount;
            });
            shoppingCartAmount.textContent = ` ( ${cartAmount} )`
        },
        updateSubTotal: function () {
            document.querySelectorAll(Selectors.subTotal).forEach((item) => {
                item.innerHTML = `${CartController.getData().subTotal} $`
            })
        },
        setCartDetails: function () {

            const asideCartList = document.querySelector(Selectors.asideCartList);
            if (cart.length === 0) {
                let emptyCart = `
                    <div class="p-5 m-5">
                        <p class="lead text-uppercase text-secondary text-capitalize fw-normal">There are no items in your cart, go ahead and add items to your cart!</p>
                    </div>
                `
                asideCartList.innerHTML = emptyCart;
            } else {
                let asideCartItems = '';
                cart.forEach((cartItems, index) => {
                    asideCartItems += `
                <hr class="divider text-secondary">
        
                <div data-id="${cartItems.id}" "cart-id" ="${cartItems.id}" class="cart-drawer-item d-flex position-relative">
                <div class="position-relative cart-drawer-img-wrapper">
                    <img src="./img/product${cartItems.img}" alt="" class="cart-item-img">
                </div>
                <div class="cart-drawer-info">
                    <h3 class="card-drawer-title fw-normal ">${cartItems.product_name} (${cartItems.amount})
                    </h3>
                    <p class="cart-drawer-option text-secondary text-capitalize">
                        Color: ${cartItems.selected_color}
                    </p>
                    <p class="cart-drawer-option text-uppercase text-secondary">
                        Size: ${cartItems.selected_size}
                    </p>
                    <span>$${CartController.productTotal(cartItems)} </span>
                </div>
            </div>
                `
                })
                asideCartList.innerHTML = asideCartItems;
            }
        },
        setCartPageItem: function () {
            const cartPageItemList = document.querySelector(Selectors.cartPageItemlist);
            let cartItems = '';
            cart.forEach((cartItem, index) => {
                cartItems +=
                    ` <tr data-id="${cartItem.id}" cart-id="${cartItem.cartId}"  class="cart-table-row">
                <td>
                    <div class="position-relative cart-drawer-img-wrapper">
                        <img src="./img/product/${cartItem.img}" alt=""
                            class="cart-item-img img-fluid">
                    </div>
                </td>
                <td>
                    <div class="cart-drawer-info">
                        <h3 class="card-drawer-title text-capitalize fw-normal ">${cartItem.product_name}
                        </h3>
                        <p class="cart-drawer-option text-capitalize text-secondary">
                            Color: ${cartItem.selected_color}
                        </p>
                        <p class="cart-drawer-option text-uppercase text-secondary">
                            Size: ${cartItem.selected_size}
                        </p>
                    </div>
                </td>
                <td> <span class="shopping-cart__product-price text-secondary">$${cartItem.price}</span>
                </td>
                <td>
                    <div class="quantity-control position-relative">
                        <input type="number" name="quantity"
                            class="quantity-control__number text-center" value="${cartItem.amount}" min="1">
                        <a class="quantity-control__reduce" data-id="${cartItem.id}" cart-id="${cartItem.cartId}">-</a>
                        <a class="quantity-control__increment" data-id="${cartItem.id}" cart-id="${cartItem.cartId}">+</a>
                    </div>
                </td>
                <td>
                    <span class="shopping-cart__subtotal ">$${CartController.productTotal(cartItem)}</span>
                </td>
                <td>
                    <a href="#" class="remove-cart" data-id="${cartItem.id}" cart-id="${cartItem.cartId}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path
                                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </a>
                </td>
            </tr>`
            });
            cartPageItemList.innerHTML = cartItems;
        },
        showCartAside: function () {
            UIControl.showCartAside();
        },
        cartPageDeleteProduct: function (button) {
            const deletedRow = button.target.parentElement.parentElement;
            deletedRow.remove();
        },
        asideDeleteProduct: function (dataId) {
            const asideCartList = document.querySelectorAll(Selectors.asideCartItem);
            asideCartList.forEach(item => {
                if (item.dataset.id == Number(dataId)) {
                    item.previousElementSibling.remove();
                    item.remove();
                }
            });
        },
        updateProductUI: function (e) {
            const dataId = e.target.dataset.id;
            const cartItemId = e.target.getAttribute("cart-id");
            const cartPageItemList = document.querySelector(Selectors.cartPageItemlist).children;

            Array.from(cartPageItemList).forEach(cartItem => {
                if (cartItem.getAttribute("cart-id") == cartItemId) {
                    const element = cart.find(item => item.cartId == cartItemId);

                    if (element) {
                        const priceElement = cartItem.querySelector('.shopping-cart__subtotal');
                        const quantityInput = cartItem.querySelector('.quantity-control__number');

                        if (priceElement) {
                            priceElement.textContent = `$${CartController.productTotal(element)}`;
                        }

                        if (quantityInput) {
                            quantityInput.value = element.amount;
                        }
                    }
                }
            });

            this.setCartDetails();
        }

    }

})();




const Cart = (function (UICtrl, CartCtrl, StorageCtrl) {

    const UISelectors = UICtrl.getSelector();


    const loadEventListener = function () {
        document.addEventListener("DOMContentLoaded", function () {
            UICtrl.setCartDetails();
            CartCtrl.initData();
            UICtrl.updateCartAmount(CartCtrl.getData().amount);
            UICtrl.updateSubTotal();

            //add item to cart
            const addButtons = document.querySelectorAll(UISelectors.addToCartBtn);
            addButtons.forEach(addButton => {
                addButton.addEventListener("click", addToCart);

            });

            if (document.querySelector(UISelectors.shoppingPage)) {

                //show product
                UICtrl.setCartPageItem();

                //delete item to cart
                const removeButtons = document.querySelectorAll(UISelectors.removeBtn);
                removeButtons.forEach((removeButton) => {
                    removeButton.addEventListener("click", deleteItem);
                })

                //update quantity 
                const updateButtonDiv = document.querySelectorAll(UISelectors.quantityControl);
                updateButtonDiv.forEach((updateButtonDiv) => {
                    updateButtonDiv.addEventListener("click", updateItem)
                })

            }

        });


    }


    const addToCart = function (button, amount, size, color) {
        //add to product data
        const dataId = button.target.dataset.id;
        const addedProduct = CartCtrl.addedProduct(dataId, amount, size, color);

        //add product to localStorage
        const isAdd = StorageCtrl.storeCart(addedProduct, amount, size, color);
        if (isAdd) {
            //update cart UI
            UICtrl.updateCartAmount(CartCtrl.getData().amount);
            UICtrl.setCartDetails();
            UICtrl.updateSubTotal();

            //show aside 
            UICtrl.showCartAside();
        } else {
            throw new Error("Sorry, we were unable to add the item to the basket. Please try again or contact our support team");

        }

    }

    const deleteItem = function (button) {
        button.preventDefault();
        //delete to product data
        CartCtrl.deleteProduct(button);

        //delete to product storage
        const dataId = button.target.dataset.id;
        StorageCtrl.deleteProductToStorage(dataId);

        //delete item to cart page
        UICtrl.cartPageDeleteProduct(button);

        //delete item to aside
        UICtrl.asideDeleteProduct(dataId);

        UICtrl.updateCartAmount(CartCtrl.getData().amount);
        UICtrl.updateSubTotal();

    }

    const updateItem = function (e) {

        //update cartData
        CartCtrl.updateCartAmount(e);

        //update local storage
        StorageCtrl.updateCartAmount(e);

        // Update UI
        // Trigger custom event for cart update
        UICtrl.updateProductUI(e);
        UICtrl.updateCartAmount(CartCtrl.getData().amount);
        UICtrl.updateSubTotal();

    }



    return {
        init: function () {
            loadEventListener();
        },
        deleteItem: deleteItem,
        addItemToCart: function (dataId, amount, size, color) {
            addToCart(dataId, amount, size, color);
        }
    }

})(UIController, CartController, StorageController);

function cartFunc() {
    Cart.init();
}

function addItem(dataId, amount, size, color) {
    Cart.addItemToCart(dataId, amount, size, color);
}

export { addItem }

export default cartFunc();


