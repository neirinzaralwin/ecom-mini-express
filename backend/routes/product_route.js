const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/product_controller');


router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;