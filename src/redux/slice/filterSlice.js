import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoriesIndex: 0,
	sortIndex: { name: 'популярности', sort: 'rating' },
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoriesIndex(state, action) {
			state.categoriesIndex = action.payload;
		},
		setSortIndex(state, action) {
			state.sortIndex = action.payload;
		},
	},
});

export const { setCategoriesIndex, setSortIndex } = filterSlice.actions;

export default filterSlice.reducer;
