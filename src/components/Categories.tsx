import React from 'react';

type CategoriesProps = {
	value: number;
	onClickCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
	const categoriesMenu: { name: string }[] = [
		{ name: 'Все' },
		{ name: 'Мясные' },
		{ name: 'Вегетарианская' },
		{ name: 'Гриль' },
		{ name: 'Острые' },
		{ name: 'Микс' },
	];

	return (
		<div className="categories">
			<ul>
				{categoriesMenu.map((obj, i) => (
					<li
						key={obj.name}
						className={value === i ? 'active' : ''}
						onClick={() => onClickCategory(i)}>
						{obj.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
