import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CoffeeShopDetail from './components/CoffeeShopDetail'; // Import your CoffeeShopDetail component

function App() {
	return (
		<Router>
			<div className='min-h-screen bg-gray-100'>
				<Routes>
					<Route
						path='/'
						exact
						component={Home}
					/>
					<Route
						path='/coffeeShop/:id'
						component={CoffeeShopDetail}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
