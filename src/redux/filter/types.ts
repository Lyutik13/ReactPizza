export enum SortPropertyEnum {
	RATING_DESC = 'rating',
	RATING_ASC = '-rating',
	PRICE_DESC = 'price',
	PRICE_ASC = '-price',
	NAME_DESC = 'name',
	NAME_ASC = '-name',
}

export type SortType = {
	name: string;
	sort: SortPropertyEnum;
};

export interface FilterSliceState {
	searchValue: string;
	categoriesIndex: number;
	paginatePage: number;
	sortIndex: SortType;
}