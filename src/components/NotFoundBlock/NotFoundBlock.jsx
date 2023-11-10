import React from 'react';

import style from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
	return (
		<div className={style.error}>
			<h1>
				<span>😕</span> <br />
				Ничего не найденно
			</h1>
			<p className={style.desc}>
				К сожалению данная страница отсутствует в нашем магазине.
				<br /> <span>404!</span>
			</p>
		</div>
	);
};

export default NotFoundBlock;
