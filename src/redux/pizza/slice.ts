import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Pizza, PizzasSliceState, Status } from './types';
import { fetchPizzas } from './asyncActions';

const initialState: PizzasSliceState = {
	items: [],
	status: Status.LOADING, // loading | success | error
};

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
