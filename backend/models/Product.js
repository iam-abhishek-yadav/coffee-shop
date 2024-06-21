const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	category: { type: String, required: true },
	coffeeShopId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'CoffeeShop',
		required: true,
	},
});

module.exports = mongoose.model('Product', ProductSchema);
