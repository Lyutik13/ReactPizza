import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceketon from '../components/PizzaBlock/Sceketon';

export const Home = ({ searchValue }) => {
	const [items, setItems] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [categoriesIndex, setCategoriesIndex] = React.useState(0);
	const [sortIndex, setSortIndex] = React.useState({ name: 'популярности', sort: 'rating' });

	React.useEffect(() => {
		setLoading(true);

		const category = categoriesIndex > 0 ? categoriesIndex : '';
		const sortBy = sortIndex.sort.replace('-', '');
		const order = sortIndex.sort.includes('-') ? 'asc' : 'desc';

		fetch(
			`https://653f682d9e8bd3be29e07f76.mockapi.io/items?category=${category}&sortBy=${sortBy}&order=${order}`,
		)
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
		window.scrollTo(0, 0);
	}, [categoriesIndex, sortIndex]);

	const filtredItems =
		items && items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoriesIndex} onClickCategory={(i) => setCategoriesIndex(i)} />
				<Sort value={sortIndex} onClickSort={(i) => setSortIndex(i)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{(loading ? [...Array(8)] : filtredItems).map((obj, i) =>
					loading ? <Sceketon key={i} /> : <PizzaBlock key={obj.name} {...obj} />,
				)}
			</div>
		</div>
	);
};

// 46:20