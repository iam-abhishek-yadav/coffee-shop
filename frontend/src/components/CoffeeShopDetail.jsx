import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import ProductModal from '../components/ProductModal';

const CoffeeShopDetail = () => {
	const { id } = useParams();
	const [coffeeShop, setCoffeeShop] = useState(null);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedProduct, setSelectedProduct] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const shopResult = await axios.get(`${API_URL}/api/coffeeshops/${id}`);
				setCoffeeShop(shopResult.data);
				const productsResult = await axios.get(`${API_URL}/api/products/${id}`);
				setProducts(productsResult.data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
				setLoading(false);
			}
		};
		fetchData();
	}, [id]);

	const handleProductClick = (product) => {
		setSelectedProduct(product);
	};

	const handleCloseModal = () => {
		setSelectedProduct(null);
	};

	if (loading) return <Spinner />;

	return (
		<Layout>
			<div className='flex flex-col items-center mb-8'>
				<div className='flex items-center mb-4'>
					<div className='flex justify-center items-center w-20 h-20 rounded-full text-white text-3xl font-bold mr-4'>
						<img
							className='max-h-full max-w-full object-contain'
							src={coffeeShop.images[0]}
							alt={coffeeShop.name}
						/>
					</div>
					<div>
						<h1 className='text-4xl font-bold'>{coffeeShop.name}</h1>
						<p className='text-gray-700'>{coffeeShop.location}</p>
					</div>
				</div>
			</div>
			<h2 className='text-3xl font-bold mb-4'>Products</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{products.map((product) => (
					<div
						key={product._id}
						className='bg-white shadow-md rounded-lg p-4 cursor-pointer'
						onClick={() => handleProductClick(product)}>
						<div className='flex justify-center mb-4'>
							{product.images ? (
								<img
									className='max-w-40 max-h-40 object-contain rounded-lg'
									src={product.images[0]}
									alt={product.name}
								/>
							) : (
								<div className='w-32 h-32 bg-gray-200 flex items-center justify-center rounded-full text-3xl text-gray-500'>
									{product.name.charAt(0).toUpperCase()}
								</div>
							)}
						</div>
						<h3 className='text-xl font-bold mb-2'>{product.name}</h3>
						<p className='text-gray-700 mb-4'>${product.price.toFixed(2)}</p>
						<p className='text-gray-500'>{product.category}</p>
					</div>
				))}
			</div>
			{selectedProduct && (
				<ProductModal
					product={selectedProduct}
					onClose={handleCloseModal}
				/>
			)}
		</Layout>
	);
};

export default CoffeeShopDetail;
