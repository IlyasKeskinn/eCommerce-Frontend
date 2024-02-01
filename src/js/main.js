import header from './header.js';
import aside from './aside_section.js';
import slider from './slider.js';
import product from './product.js';

async function getProducts() {
    const data = await fetch('./js/products.json');
    const products = await data.json();

    products ? localStorage.setItem("products", JSON.stringify(products)) : [];
}
getProducts();

