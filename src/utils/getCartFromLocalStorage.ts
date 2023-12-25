import { calcTotalCount } from './calcTotalCount';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLocalStorage = () => {
	const dataJson = localStorage.getItem('cart');
	const items = dataJson ? JSON.parse(dataJson) : [];
	const totalPrice = calcTotalPrice(items);
	const totalCount = calcTotalCount(items);

	return {
		items,
		totalPrice,
		totalCount,
	};
};
