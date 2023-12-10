import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (props) => {
	const { category, sortBy, order, search, paginatePage } = props;
	const { data } = await axios.get(
		`https://653f682d9e8bd3be29e07f76.mockapi.io/items?page=${paginatePage}&limit=8${search}&category=${category}&sortBy=${sortBy}&order=${order}`,
	);

	return data;
});

const initialState = {
	items: [],
  status: 'loading' // loading | success | error
};

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = 'loading';
				state.items = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = 'success';
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = 'error';
				state.items = [];
			});
	},
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
