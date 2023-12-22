import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type CartItem = {
	id: string;
	name: string;
	price: number;
	types: string;
	sizes: number;
  count: number;
	imageUrl: string;
};

interface CartSliceState {
	totalPrice: number;
	totalCount: number;
	items: CartItem[];
}

const initialState: CartSliceState = {
	totalPrice: 0,
	totalCount: 0,
	items: [],
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
		addItems(state, action:PayloadAction<CartItem>) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}

			state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);

			state.totalCount = state.items.reduce((sum, obj) => obj.count + sum, 0);
		},

		// bag
		minusItems(state, action:PayloadAction<string>) {
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
		delItems(state, action:PayloadAction<string>) {
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