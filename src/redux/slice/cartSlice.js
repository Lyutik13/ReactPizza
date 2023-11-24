import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalPrice: 0,
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItems(state, action) {
			state.items.push(action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price + sum
      }, 0)
		},
		delItems(state, action) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		clearItems(state, action) {
			state.items = [];
		},
	},
});

export const { addItems, delItems, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
