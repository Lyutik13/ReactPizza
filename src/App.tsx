import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import { Home } from './pages/Home';
import { Header } from './components';

// import pizzaItems from './assets/pizzas.json';
import './scss/app.scss';

// const Cart = React.lazy(() => import(/* webpackChunkName: "Cart"*/ './pages/Cart'));

// Подгрузка спомощью react-loadable для Code Splitting на клиенте
const Cart = Loadable({
	loader: () => import(/* webpackChunkName: "Cart"*/ './pages/Cart'),
	loading: () => (
		<div style={{ textAlign: 'center' }} className="container">
			Загрузка корзины...
		</div>
	),
});

// Подгрузка спомощью React.lazy через Suspense для Code Splitting на сервере и клиенте
const OneInfoPizza = React.lazy(
	() => import(/* webpackChunkName: "OneInfoPizza"*/ './components/OneInfoPizza/OneInfoPizza'),
);
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound"*/ './pages/NotFound'));

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
					<Route
						path="/item/:id"
						element={
							<React.Suspense>
								<OneInfoPizza />
							</React.Suspense>
						}
					/>
					<Route
						path="*"
						element={
							<React.Suspense fallback={<div className="container">404</div>}>
								<NotFound />
							</React.Suspense>
						}
					/>
				</Routes>
			</div>
			{/* </SearchContext.Provider> */}
		</div>
	);
}

export default App;
