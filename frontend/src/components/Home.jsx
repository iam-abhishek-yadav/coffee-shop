import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

const Home = () => {
	const [coffeeShops, setCoffeeShops] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(`${API_URL}/api/coffeeshops`);
				setCoffeeShops(result.data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<Layout>
			<h1 className='text-4xl font-bold text-center mb-8'>Coffee Shops</h1>
			{loading ? (
				<Spinner />
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{coffeeShops.map((shop) => (
						<div
							key={shop._id}
							className='bg-white shadow-md rounded-lg overflow-hidden'>
							<div className='h-48 flex items-center justify-center'>
								{shop.images.length > 0 ? (
									<img
										className='max-h-full max-w-full object-contain'
										src={shop.images[0]}
										alt={shop.name}
									/>
								) : (
									<div className='flex items-center justify-center w-full h-full bg-gray-300'>
										<div className='text-4xl font-bold text-gray-600'>
											{shop.name.charAt(0).toUpperCase()}
										</div>
									</div>
								)}
							</div>
							<div className='p-4'>
								<h2 className='text-xl font-bold mb-2'>{shop.name}</h2>
								<p className='text-gray-700 mb-4'>{shop.location}</p>
								<Link
									to={`/shop/${shop._id}`}
									className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'>
									View Details
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</Layout>
	);
};

export default Home;
