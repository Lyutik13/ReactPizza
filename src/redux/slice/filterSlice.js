import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoriesIndex: 0,
	paginatePage: 1,
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
		setPaginatePage(state, action) {
			state.paginatePage = action.payload;
		},
		setFiltersUrl(state, action) {
			state.categoriesIndex = Number(action.payload.categoriesIndex);
			state.paginatePage = Number(action.payload.paginatePage);
			state.sortIndex = action.payload.sortIndex;
		},
	},
});

export const { setCategoriesIndex, setSortIndex, setPaginatePage, setFiltersUrl } =
	filterSlice.actions;

export default filterSlice.reducer;
