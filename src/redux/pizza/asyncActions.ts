import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizzas/fetchPizzasStatus',
	async (props) => {
		const { category, sortBy, order, search, paginatePage } = props;
		const { data } = await axios.get(
			`https://653f682d9e8bd3be29e07f76.mockapi.io/items?page=${paginatePage}&limit=8${search}&category=${category}&sortBy=${sortBy}&order=${order}`,
		);

		return data;
	},
);
