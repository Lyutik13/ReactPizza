import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import style from './OneInfoPizza.module.scss';

export const OneInfoPizza: React.FC = () => {
	let { id } = useParams();
	const navigate = useNavigate();
	const [onePizza, setOnePizza] = useState<{ imageUrl: string; name: string; price: number }>();

	useEffect(() => {
		async function fetchOnePizza() {
			try {
				const { data } = await axios.get(`https://653f682d9e8bd3be29e07f76.mockapi.io/items/${id}`);
				setOnePizza(data);
			} catch (error) {
				alert('error fetchOnePizza');
				console.log(error);
				navigate('/');
			}
		}

		fetchOnePizza();
		// eslint-disable-next-line
	}, []);

	if (!onePizza) {
		return (
			<div style={{ textAlign: 'center' }} className="container">
				loading...
			</div>
		);
	}

	return (
		<div className={`container ${style.oneInfoPizza}`}>
			<div>
				<img className={style.oneInfoPizza__img} src={onePizza.imageUrl} alt="Pizza" />
			</div>
			<div className={style.oneInfoPizza__desc}>
				<div className={style.textWrapper}>
					<h4 className={style.h4} style={{ fontSize: '36px' }}>
						{onePizza.name}
					</h4>
					<div className={style.span} style={{ fontSize: '24px', color: '#fe5f1e' }}>
						от {onePizza.price} ₽
					</div>
				</div>
				<div>
					<Link to={'/'} className="button button--black">
						<span>Вернуться назад</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default OneInfoPizza;
