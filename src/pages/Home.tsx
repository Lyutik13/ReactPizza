import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoriesIndex, setPaginatePage, setFiltersUrl } from '../redux/slice/filterSlice';
import { SearchPizzaParams, fetchPizzas } from '../redux/slice/pizzasSlice';

// import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceketon from '../components/PizzaBlock/Sceketon';
import Paginate from '../components/Paginate';
import { list } from '../components/Sort';
import { RootState, useAppDispatch } from '../redux/store';

export const Home: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const categoriesIndex = useSelector((state: RootState) => state.filter.categoriesIndex);
	const sortIndex = useSelector((state: RootState) => state.filter.sortIndex.sort);
	const paginatePage = useSelector((state: RootState) => state.filter.paginatePage);
	const { items, status } = useSelector((state: RootState) => state.pizzas);
	const searchValue = useSelector((state: RootState) => state.filter.searchValue);

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
		const category = categoriesIndex > 0 ? String(categoriesIndex) : '';
		const sortBy = sortIndex.replace('-', '');
		const order = sortIndex.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				paginatePage: String(paginatePage),
			}),
		);

		window.scrollTo(0, 0);
	};

	// Если изменили параметры и был первый рендер
/* 	React.useEffect(() => {
		if (isMounted.current) {
			const params = {
				categoriesIndex: categoriesIndex > 0 ? categoriesIndex : null,
				sortIndex: sortIndex,
				paginatePage,
			};

			const queryString = qs.stringify(params, { skipNulls: true });

			navigate(`/?${queryString}`);
		}

		if (!window.location.search) {
			console.log(111);
			dispatch(fetchPizzas({} as SearchPizzaParams));
		}

		isMounted.current = true;
		// eslint-disable-next-line
	}, [categoriesIndex, paginatePage, sortIndex, searchValue]); */

	// Если был первый рендер, то запрашиваем пиццы
	React.useEffect(() => {
		if (!isSearch.current) {
			getPizzas();
		}

		isSearch.current = false;
		// eslint-disable-next-line
	}, [categoriesIndex, paginatePage, sortIndex, searchValue]);

	// Парсим параметры при первом рендере
/* 	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
			const sortIndex = list.find((obj) => obj.sort === params.sortBy);

			dispatch(
				setFiltersUrl({
					searchValue: params.search,
					categoriesIndex: Number(params.category),
					paginatePage: Number(params.paginatePage),
					sortIndex: sortIndex || list[0]
				}),
			);
			isSearch.current = true;
		}
		isMounted.current = true;
		// eslint-disable-next-line
	}, []);
 */
	const filtredItems =
		items &&
		items.filter((item: any) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

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
