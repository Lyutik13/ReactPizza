import React from 'react';

function Categories() {
	const [categoriesIndex, setCategoriesIndex] = React.useState(0);

	const categoriesMenu = [
		{ name: 'Все' },
		{ name: 'Мясные' },
		{ name: 'Вегетарианская' },
		{ name: 'Гриль' },
		{ name: 'Острые' },
		{ name: 'Закрытые' },
	];

	function onClickCategory(i) {
		setCategoriesIndex(i);
	}

	return (
		<div className="categories">
			<ul>
				{categoriesMenu.map((obj, i) => (
					<li
						key={obj.name}
						className={categoriesIndex === i ? 'active' : ''}
						onClick={() => onClickCategory(i)}>
						{obj.name}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Categories;
