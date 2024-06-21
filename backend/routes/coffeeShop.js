const express = require('express');
const router = express.Router();
const {
	getAllCoffeeShops,
	getCoffeeShopById,
} = require('../controllers/coffeeShopController');

router.get('/', getAllCoffeeShops);
router.get('/:id', getCoffeeShopById);

module.exports = router;
