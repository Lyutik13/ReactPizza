import React from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

// import pizzaItems from './assets/pizzas.json';
import './scss/app.scss';

function App() {
	const [items, setItems] = React.useState([]);

	React.useEffect(() => {
		fetch(`https://653f682d9e8bd3be29e07f76.mockapi.io/items`)
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				setItems(json);
			})
			.catch((err) => {
				console.warn(err);
				alert('Error fatch API');
			});
	}, []);

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories />
						<Sort />
					</div>
					<h2 className="content__title">Все пиццы</h2>
					<div className="content__items">
						{items.map((obj) => (
							<PizzaBlock key={obj.name} {...obj} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
