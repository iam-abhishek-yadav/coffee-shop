const express = require('express');
const router = express.Router();
const {
	getProductsByCoffeeShopId,
} = require('../controllers/productController');

router.get('/:coffeeShopId', getProductsByCoffeeShopId);

module.exports = router;
