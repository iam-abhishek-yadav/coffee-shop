import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CoffeeShopDetail from './components/CoffeeShopDetail';

function App() {
	return (
		<Router>
			<div className='min-h-screen bg-gray-100'>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/shop/:id'
						element={<CoffeeShopDetail />}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
