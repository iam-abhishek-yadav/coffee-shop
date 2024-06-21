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
		images: ['https://example.com/image1.jpg'],
	},
	{
		name: 'The Daily Grind',
		location: '123 Coffee St, Seattle, WA 98101',
		ratings: 4.7,
		images: ['https://example.com/image2.jpg'],
	},
];

const products = [
	{
		name: 'Espresso',
		price: 3.0,
		category: 'Coffee',
	},
	{
		name: 'Cappuccino',
		price: 4.0,
		category: 'Coffee',
	},
	{
		name: 'Latte',
		price: 4.5,
		category: 'Coffee',
	},
	{
		name: 'Bagel',
		price: 2.5,
		category: 'Food',
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
