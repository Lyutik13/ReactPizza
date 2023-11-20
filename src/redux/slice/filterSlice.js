import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoriesIndex: 0,
	sortIndex: { name: 'популярности', sort: 'rating' },
  paginatePage: 1
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
		setPaginatePage(state, action) {
			state.paginatePage = action.payload;
		},
	},
});

export const { setCategoriesIndex, setSortIndex, setPaginatePage } = filterSlice.actions;

export default filterSlice.reducer;
