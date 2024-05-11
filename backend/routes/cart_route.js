const express = require('express');
const router = express.Router();

const { getCartProducts, addProductToCart, deleteProductFromCart } = require('../controllers/cart_controller');

router.get('/', getCartProducts);
router.post('/', addProductToCart);
router.delete('/:id', deleteProductFromCart);

module.exports = router;