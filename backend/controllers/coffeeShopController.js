const CoffeeShop = require('../models/CoffeeShop');

const getAllCoffeeShops = async (req, res) => {
	try {
		const coffeeShops = await CoffeeShop.find();
		res.json(coffeeShops);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getCoffeeShopById = async (req, res) => {
	try {
		const coffeeShop = await CoffeeShop.findById(req.params.id);
		if (!coffeeShop)
			return res.status(404).json({ message: 'Cannot find coffee shop' });
		res.json(coffeeShop);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	getAllCoffeeShops,
	getCoffeeShopById,
};
