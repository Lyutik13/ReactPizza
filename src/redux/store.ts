import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import filterReducer from './slice/filterSlice';
import cartReducer from './slice/cartSlice';
import pizzasReducer from './slice/pizzasSlice';

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		cart: cartReducer,
		pizzas: pizzasReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 

// 1:14:50