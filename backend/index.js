const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const coffeeShopRoutes = require('./routes/coffeeShop');
const productRoutes = require('./routes/products');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/coffeeshops', coffeeShopRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
	res.send('Coffee Shop Finder API');
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'frontend', 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
}

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
