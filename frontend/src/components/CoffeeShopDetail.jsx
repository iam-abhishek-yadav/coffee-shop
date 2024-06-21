import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config';

const CoffeeShopDetail = () => {
	const { id } = useParams();
	const [coffeeShop, setCoffeeShop] = useState(null);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const shopResult = await axios.get(`${API_URL}/api/coffeeshops/${id}`);
			setCoffeeShop(shopResult.data);
			const productsResult = await axios(`${API_URL}/api/products/${id}`);
			setProducts(productsResult.data);
		};
		fetchData();
	}, [id]);

	if (!coffeeShop) return <div className='text-center'>Loading...</div>;

	return (
		<div className='container mx-auto py-8'>
			<h1 className='text-4xl font-bold text-center mb-8'>{coffeeShop.name}</h1>
			<p className='text-gray-700 text-center mb-4'>{coffeeShop.location}</p>
			<div className='flex justify-center mb-8'>
				<img
					className='w-full max-w-4xl h-auto object-cover'
					src={coffeeShop.images[0]}
					alt={coffeeShop.name}
				/>
			</div>
			<h2 className='text-3xl font-bold mb-4'>Products</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{products.map((product) => (
					<div
						key={product._id}
						className='bg-white shadow-md rounded-lg p-4'>
						<h3 className='text-xl font-bold mb-2'>{product.name}</h3>
						<p className='text-gray-700 mb-4'>${product.price.toFixed(2)}</p>
						<p className='text-gray-500'>{product.category}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default CoffeeShopDetail;
