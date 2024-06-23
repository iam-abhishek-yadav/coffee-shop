import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className='bg-blue-500 text-white py-4'>
			<div className='container mx-auto flex justify-between items-center'>
				<h1 className='text-2xl font-bold'>
					<Link to='/'>Coffee Shops</Link>
				</h1>
			</div>
		</header>
	);
};

export default Header;
