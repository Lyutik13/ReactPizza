import React from 'react';

function Categories({value, onClickCategory}) {

	const categoriesMenu = [
		{ name: 'Все' },
		{ name: 'Мясные' },
		{ name: 'Вегетарианская' },
		{ name: 'Гриль' },
		{ name: 'Острые' },
		{ name: 'Закрытые' },
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
}

export default Categories;
