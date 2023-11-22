import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoriesIndex, setPaginatePage, setFiltersUrl } from '../redux/slice/filterSlice';

import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceketon from '../components/PizzaBlock/Sceketon';
import Paginate from '../components/Paginate';
import { list } from '../components/Sort';

export const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const categoriesIndex = useSelector((state) => state.filter.categoriesIndex);
	const sortIndex = useSelector((state) => state.filter.sortIndex.sort);
	const paginatePage = useSelector((state) => state.filter.paginatePage);

	const { searchValue } = React.useContext(SearchContext);
	const [items, setItems] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	// const [categoriesIndex, setCategoriesIndex] = React.useState(0);
	// const [sortIndex, setSortIndex] = React.useState({ name: 'популярности', sort: 'rating' });
	// const [paginatePage, setPaginatePage] = React.useState(1);

	const onClickCategory = (id) => {
		dispatch(setCategoriesIndex(id));
		dispatch(setPaginatePage(1));
	};

	const onPageChange = (numberPage) => {
		dispatch(setPaginatePage(numberPage));
	};

	const fetchPizzas = () => {
		setLoading(true);

		const category = categoriesIndex > 0 ? categoriesIndex : '';
		const sortBy = sortIndex.replace('-', '');
		const order = sortIndex.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';

		/* 		fetch(
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
			.finally(() => setLoading(false)); */

		// BAck mocAPI хрень, не комбинирует. либо (category sortBy) / либо search поэтому сделал filtredItems для фильтрации не через бэк а вручную на фронте
		axios
			.get(
				`https://653f682d9e8bd3be29e07f76.mockapi.io/items?page=${paginatePage}&limit=8${search}&category=${category}&sortBy=${sortBy}&order=${order}`,
			)
			.then((res) => {
				setItems(res.data);
				setLoading(false);
			});
	};

	// Если изменили параметры и был первый рендер
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({ categoriesIndex, paginatePage, sortIndex });

			navigate(`?${queryString}`);
		}

		isMounted.current = true;
	}, [categoriesIndex, paginatePage, sortIndex]);

	// Если был первый рендер, то проверяем URl-параметры и сохраняем в Redux
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sortIndex = list.find((obj) => obj.sort === params.sortIndex);

			dispatch(setFiltersUrl({ ...params, sortIndex }));
			isSearch.current = true;
		}
	}, []);

	// Если был первый рендер, то запрашиваем пиццы
	React.useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			fetchPizzas();
		}

		isSearch.current = false;
	}, [categoriesIndex, paginatePage, sortIndex, searchValue]);

	const filtredItems =
		items && items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoriesIndex} onClickCategory={onClickCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{(loading ? [...Array(4)] : filtredItems).map((obj, i) =>
					loading ? <Sceketon key={i} /> : <PizzaBlock key={obj.name} {...obj} />,
				)}
			</div>
			<Paginate paginatePage={paginatePage} onPageChange={onPageChange} />
		</div>
	);
};
