import header from './header.js';
import aside from './aside_section.js';
import { UIControl } from "./aside_section.js"
import cartFunc from './cart.js';

cartFunc;


const cartItems = JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) : [];

