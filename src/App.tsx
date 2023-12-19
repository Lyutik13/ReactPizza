import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import OneInfoPizza from './components/OneInfoPizza/OneInfoPizza';
import NotFound from './pages/NotFound';

// import pizzaItems from './assets/pizzas.json';
import './scss/app.scss';

// export const SearchContext = React.createContext({});

function App() {
	// const [searchValue, setSearchValue] = React.useState('');

	return (
		<div className="wrapper">
			{/* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */}
				<Header />
				<div className="content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/item/:id" element={<OneInfoPizza />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			{/* </SearchContext.Provider> */}
		</div>
	);
}

export default App;