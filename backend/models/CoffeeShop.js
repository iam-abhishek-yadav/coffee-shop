const mongoose = require('mongoose');

const CoffeeShopSchema = new mongoose.Schema({
	name: { type: String, required: true },
	location: { type: String, required: true },
	ratings: { type: Number, required: true },
	images: [String],
});

module.exports = mongoose.model('CoffeeShop', CoffeeShopSchema);
