const Product = require('../models/Product');

const getProductsByCoffeeShopId = async (req, res) => {
	try {
		const products = await Product.find({
			coffeeShopId: req.params.coffeeShopId,
		});
		res.json(products);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	getProductsByCoffeeShopId,
};
