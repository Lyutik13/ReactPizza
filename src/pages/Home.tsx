import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoriesIndex, setPaginatePage, setFiltersUrl } from '../redux/slice/filterSlice';
import { fetchPizzas } from '../redux/slice/pizzasSlice';

// import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceketon from '../components/PizzaBlock/Sceketon';
import Paginate from '../components/Paginate';
import { list } from '../components/Sort';

export const Home: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const categoriesIndex = useSelector((state: any) => state.filter.categoriesIndex);
	const sortIndex = useSelector((state: any) => state.filter.sortIndex.sort);
	const paginatePage = useSelector((state: any) => state.filter.paginatePage);
	const { items, status } = useSelector((state: any) => state.pizzas);
	const searchValue = useSelector((state: any) => state.filter.searchValue);

	// const { searchValue } = React.useContext(SearchContext);
	// const [loading, setLoading] = React.useState(true);
	// const [items, setItems] = React.useState([]);
	// const [categoriesIndex, setCategoriesIndex] = React.useState(0);
	// const [sortIndex, setSortIndex] = React.useState({ name: 'популярности', sort: 'rating' });
	// const [paginatePage, setPaginatePage] = React.useState(1);

	const onClickCategory = (id: number) => {
		dispatch(setCategoriesIndex(id));
		dispatch(setPaginatePage(1));
	};

	const onPageChange = (numberPage: number) => {
		dispatch(setPaginatePage(numberPage));
	};

	const getPizzas = async () => {
		const category = categoriesIndex > 0 ? categoriesIndex : '';
		const sortBy = sortIndex.replace('-', '');
		const order = sortIndex.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			//@ts-ignore
			fetchPizzas({ category, sortBy, order, search, paginatePage }),
		);

		window.scrollTo(0, 0);
	};

	// Если изменили параметры и был первый рендер
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({ categoriesIndex, paginatePage, sortIndex });

			navigate(`?${queryString}`);
		}

		isMounted.current = true;
		// eslint-disable-next-line
	}, [categoriesIndex, paginatePage, sortIndex]);

	// Если был первый рендер, то проверяем URl-параметры и сохраняем в Redux
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sortIndex = list.find((obj) => obj.sort === params.sortIndex);

			dispatch(setFiltersUrl({ ...params, sortIndex }));
			isSearch.current = true;
		}
		// eslint-disable-next-line
	}, []);

	// Если был первый рендер, то запрашиваем пиццы
	React.useEffect(() => {
		if (!isSearch.current) {
			getPizzas();
		}

		isSearch.current = false;
		// eslint-disable-next-line
	}, [categoriesIndex, paginatePage, sortIndex, searchValue]);

	const filtredItems =
		items && items.filter((item: any) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

	const pizzas = filtredItems.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, i) => <Sceketon key={i} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoriesIndex} onClickCategory={onClickCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === 'error' ? (
				<div className="content__error-info">
					<div className="sadSmail">😕</div>
					<h2>Произошла ошибка</h2>
					<p>
						Не удалось загрузить пиццы.
						<br />
						Попробуйте чуть попозже.
					</p>
				</div>
			) : (
				<div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
			)}

			<Paginate paginatePage={paginatePage} onPageChange={onPageChange} />
		</div>
	);
};
