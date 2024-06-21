import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const Home = () => {
	const [coffeeShops, setCoffeeShops] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(`${API_URL}/api/coffeeshops`);
				setCoffeeShops(result.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className='container mx-auto py-8'>
			<h1 className='text-4xl font-bold text-center mb-8'>Coffee Shops</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{coffeeShops.length > 0 ? (
					coffeeShops.map((shop) => (
						<div
							key={shop._id}
							className='bg-white shadow-md rounded-lg overflow-hidden'>
							<img
								className='w-full h-48 object-cover'
								src={shop.images[0]}
								alt={shop.name}
							/>
							<div className='p-4'>
								<h2 className='text-xl font-bold mb-2'>{shop.name}</h2>
								<p className='text-gray-700 mb-4'>{shop.location}</p>
								<Link
									to={`/coffeeShop/${shop._id}`}
									className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'>
									View Details
								</Link>
							</div>
						</div>
					))
				) : (
					<div className='text-center'>Loading...</div>
				)}
			</div>
		</div>
	);
};

export default Home;
