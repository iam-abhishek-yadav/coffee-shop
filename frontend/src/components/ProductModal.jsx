import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ProductModal = ({ product, onClose }) => {
	return (
		<div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center'>
			<div className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative'>
				<button
					onClick={onClose}
					className='absolute top-4 right-4 text-gray-500 hover:text-gray-800'>
					<FontAwesomeIcon
						icon={faTimes}
						size='lg'
					/>
				</button>
				<img
					className='max-w-40 max-h-40 object-contain rounded-lg'
					src={product.images[0]}
					alt={product.name}
				/>
				<h2 className='text-2xl font-bold mb-4'>{product.name}</h2>
				<p className='text-gray-700 mb-4'>${product.price.toFixed(2)}</p>
				<p className='text-gray-500 mb-4'>{product.category}</p>
				<p className='text-gray-500 mb-4'>{product.description}</p>
			</div>
		</div>
	);
};

export default ProductModal;
