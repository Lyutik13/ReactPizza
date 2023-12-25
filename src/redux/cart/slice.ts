import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { calcTotalCount } from '../../utils/calcTotalCount';
import { CartItem, CartSliceState } from './types';

const { items, totalPrice, totalCount } = getCartFromLocalStorage();

const initialState: CartSliceState = {
	items,
	totalPrice,
	totalCount,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// addItems(state, action) {
		// 	state.items.push(action.payload);
		//   state.totalPrice = state.items.reduce((sum, obj) => {
		//     return obj.price + sum
		//   }, 0)
		// },
		addItems(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}

			state.totalPrice = calcTotalPrice(state.items);

			state.totalCount = calcTotalCount(state.items);
		},

		// bag
		minusItems(state, action: PayloadAction<string>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);

			if (findItem) {
				findItem.count--;
			}

			// state.totalPrice = state.items.reduce((sum, obj) => {
			// 	return obj.price * obj.count - sum;
			// }, 0);

			// state.totalCount = state.items.reduce((sum, obj) => {
			// 	return obj.count - sum;
			// }, 0);
		},

		// bag
		delItems(state, action: PayloadAction<string>) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},

		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
			state.totalCount = 0;
		},
	},
});

export const { addItems, delItems, clearItems, minusItems } = cartSlice.actions;

export default cartSlice.reducer;
