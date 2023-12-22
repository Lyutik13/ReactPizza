import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type Pizza = {
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	types: number[];
	sizes: number[];
	rating: number;
};

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface PizzasSliceState {
	items: Pizza[];
	status: Status;
}

const initialState: PizzasSliceState = {
	items: [],
	status: Status.LOADING, // loading | success | error
};

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
	'pizzas/fetchPizzasStatus',
	async (props) => {
		const { category, sortBy, order, search, paginatePage } = props;
		const { data } = await axios.get(
			`https://653f682d9e8bd3be29e07f76.mockapi.io/items?page=${paginatePage}&limit=8${search}&category=${category}&sortBy=${sortBy}&order=${order}`,
		);

		return data;
	},
);

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = Status.LOADING;
				state.items = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = Status.SUCCESS;
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = Status.ERROR;
				state.items = [];
			});
	},
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
