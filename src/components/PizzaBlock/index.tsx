import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CartItem, addItems } from '../../redux/slice/cartSlice';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';

type PizzaBlockProps = {
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	types: number[];
	sizes: number[];
	rating: number;
};

const typeNames = ['тонкое', 'традиционное'];

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, imageUrl, name, types, sizes, price }) => {
	const dispatch = useDispatch();
	const cartItem = useSelector((state: RootState) => state.cart.items.find((obj) => obj.id === id));
	const [sizesPizza, setSizesPizza] = useState(0);
	const [typesPizza, setTypesPizza] = useState(0);

	const addedCount = cartItem ? cartItem.count : 0;

	const onClickAddCart = () => {
		const item: CartItem = {
			id,
			name,
			price,
			imageUrl,
			types: typeNames[typesPizza],
			sizes: sizes[sizesPizza],
			count: 0,
		};

		dispatch(addItems(item));
	};

	return (
		<div className="pizza-block__wrapper">
			<div className="pizza-block">
				<Link to={`item/${id}`} key={id}>
					<img className="pizza-block__image" src={imageUrl} alt="Pizza" />
				</Link>
				<h4 className="pizza-block__title">{name}</h4>
				<div className="pizza-block__selector">
					<ul>
						{types.map((typeId, i) => (
							<li
								className={typesPizza === i ? 'active' : ''}
								onClick={() => setTypesPizza(i)}
								key={i}>
								{typeNames[typeId]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((size, i) => (
							<li
								className={sizesPizza === i ? 'active' : ''}
								onClick={() => setSizesPizza(i)}
								key={i}>
								{size} см.
							</li>
						))}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">от {price} ₽</div>
					<button onClick={onClickAddCart} className="button button--outline button--add">
						<svg
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
								fill="white"
							/>
						</svg>
						<span>Добавить</span>
						{addedCount > 0 && <i>{addedCount}</i>}
					</button>
				</div>
			</div>
		</div>
	);
};

export default PizzaBlock;
