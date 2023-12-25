import React from 'react';
import {  useDispatch } from 'react-redux';

import { setSortIndex } from '../redux/filter/slice';
import { SortPropertyEnum, SortType } from '../redux/filter/types';

type SortItem = {
	name: string;
	sort: SortPropertyEnum;
};

type SortValueProps = {
	sortValue: SortType;
};

export const list: SortItem[] = [
	{ name: 'популярности(DESC)', sort: SortPropertyEnum.RATING_DESC },
	{ name: 'популярности(ASC)', sort: SortPropertyEnum.RATING_ASC },
	{ name: 'цене(DESC)', sort: SortPropertyEnum.PRICE_DESC },
	{ name: 'цене(ASC)', sort: SortPropertyEnum.PRICE_ASC },
	{ name: 'алфавиту(DESC)', sort: SortPropertyEnum.NAME_DESC },
	{ name: 'алфавиту(ASC)', sort: SortPropertyEnum.NAME_ASC },
];

const Sort: React.FC<SortValueProps> = React.memo(({ sortValue }) => {
	const dispatch = useDispatch();
	const sortRef = React.useRef<HTMLDivElement>(null);

	const [openPopap, setOpenPopap] = React.useState<boolean>(false);

	const onClickPopap = (obj: SortItem) => {
		dispatch(setSortIndex(obj));
		setOpenPopap(false);
	};

	React.useEffect(() => {
		const clickOutside = (event: MouseEvent) => {
			if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
				setOpenPopap(false);
			}
		};

		document.body.addEventListener('click', clickOutside);

		return () => {
			document.body.removeEventListener('click', clickOutside);
		};
	}, []);

	return (
		<div ref={sortRef} className="sort">
			<div className="sort__label">
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setOpenPopap(!openPopap)}>{sortValue.name}</span>
			</div>
			{openPopap && (
				<div className="sort__popup">
					<ul>
						{list.map((obj, i) => (
							<li
								className={sortValue.sort === obj.sort ? 'active' : ''}
								key={i}
								onClick={() => onClickPopap(obj)}>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
});

export default Sort;
