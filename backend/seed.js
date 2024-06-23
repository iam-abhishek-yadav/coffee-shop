const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CoffeeShop = require('./models/CoffeeShop');
const Product = require('./models/Product');

dotenv.config();

const coffeeShops = [
	{
		name: 'Central Perk',
		location: '90 Bedford St, New York, NY 10014',
		ratings: 4.5,
		images: [
			'https://centralperk.com/cdn/shop/files/new_logo_main_white_250x.png?v=1695018061',
		],
	},
	{
		name: 'The Daily Grind',
		location: '123 Coffee St, Seattle, WA 98101',
		ratings: 4.7,
		images: [
			'https://dailygrind.ph/wp-content/uploads/2023/10/Daily-Grind-Coffee-logo.png',
		],
	},
];

const products = [
	{
		name: 'Espresso',
		price: 3.0,
		category: 'Coffee',
		images: [
			'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
		],
	},
	{
		name: 'Cappuccino',
		price: 4.0,
		category: 'Coffee',
		images: [
			'https://images.pexels.com/photos/189258/pexels-photo-189258.jpeg?auto=compress&cs=tinysrgb&w=400',
		],
	},
	{
		name: 'Latte',
		price: 4.5,
		category: 'Coffee',
		images: [
			'https://images.pexels.com/photos/1036444/pexels-photo-1036444.jpeg?auto=compress&cs=tinysrgb&w=400',
		],
	},
	{
		name: 'Bagel',
		price: 2.5,
		category: 'Food',
		images: [
			'https://images.pexels.com/photos/3957499/pexels-photo-3957499.jpeg?auto=compress&cs=tinysrgb&w=400',
		],
	},
];

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB connected');

		await CoffeeShop.deleteMany({});
		await Product.deleteMany({});

		const createdCoffeeShops = await CoffeeShop.insertMany(coffeeShops);
		console.log('Coffee shops added:', createdCoffeeShops);

		const productsWithShopId = products.map((product, index) => {
			if (index < 2) {
				product.coffeeShopId = createdCoffeeShops[0]._id;
			} else {
				product.coffeeShopId = createdCoffeeShops[1]._id;
			}
			return product;
		});

		await Product.insertMany(productsWithShopId);
		console.log('Products added:', productsWithShopId);

		mongoose.disconnect();
	} catch (err) {
		console.error('Error seeding database:', err);
		mongoose.disconnect();
	}
};

seedDatabase();
