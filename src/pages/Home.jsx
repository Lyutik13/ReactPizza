import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceketon from '../components/PizzaBlock/Sceketon';

export const Home = () => {
	const [items, setItems] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		setLoading(true);

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
			})
			.finally(() => setLoading(false));
      window.scrollTo(0, 0)
	}, []);

	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{(loading ? [...Array(8)] : items).map((obj, i) =>
					loading ? <Sceketon key={i} /> : <PizzaBlock key={obj.name} {...obj} />,
				)}
			</div>
		</div>
	);
};
