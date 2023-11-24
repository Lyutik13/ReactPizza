import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slice/filterSlice';
import cartReducer from './slice/cartSlice';

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		cart: cartReducer,
	},
});
