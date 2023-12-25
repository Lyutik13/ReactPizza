import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterSliceState, SortPropertyEnum, SortType } from './types';

const initialState: FilterSliceState = {
	searchValue: '',
	categoriesIndex: 0,
	paginatePage: 1,
	sortIndex: { name: 'популярности', sort: SortPropertyEnum.RATING_DESC },
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoriesIndex(state, action: PayloadAction<number>) {
			state.categoriesIndex = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setSortIndex(state, action: PayloadAction<SortType>) {
			state.sortIndex = action.payload;
		},
		setPaginatePage(state, action: PayloadAction<number>) {
			state.paginatePage = action.payload;
		},
		setFiltersUrl(state, action: PayloadAction<FilterSliceState>) {
			if (Object.keys(action.payload).length) {
				state.categoriesIndex = Number(action.payload.categoriesIndex);
				state.paginatePage = Number(action.payload.paginatePage);
				state.sortIndex = action.payload.sortIndex;
			} else {
				state.categoriesIndex = 1;
				state.paginatePage = 0;
				state.sortIndex = { name: 'популярности', sort: SortPropertyEnum.RATING_DESC };
			}
		},
	},
});

export const { setCategoriesIndex, setSortIndex, setPaginatePage, setFiltersUrl, setSearchValue } =
	filterSlice.actions;

export default filterSlice.reducer;
