import React from 'react';

import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceketon from '../components/PizzaBlock/Sceketon';
import Paginate from '../components/Paginate';

export const Home = () => {
	const { searchValue } = React.useContext(SearchContext);

	const [items, setItems] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [categoriesIndex, setCategoriesIndex] = React.useState(0);
	const [sortIndex, setSortIndex] = React.useState({ name: 'популярности', sort: 'rating' });
	const [paginatePage, setPaginatePage] = React.useState(1);

	React.useEffect(() => {
		setLoading(true);

		const category = categoriesIndex > 0 ? categoriesIndex : '';
		const sortBy = sortIndex.sort.replace('-', '');
		const order = sortIndex.sort.includes('-') ? 'asc' : 'desc';

		fetch(
			`https://653f682d9e8bd3be29e07f76.mockapi.io/items?page=${paginatePage}&limit=8&category=${category}&sortBy=${sortBy}&order=${order}`,
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
	}, [categoriesIndex, sortIndex, paginatePage]);

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
				{(loading ? [...Array(4)] : filtredItems).map((obj, i) =>
					loading ? <Sceketon key={i} /> : <PizzaBlock key={obj.name} {...obj} />,
				)}
			</div>
			<Paginate onPageChange={(numberPage) => setPaginatePage(numberPage)} />
		</div>
	);
};
