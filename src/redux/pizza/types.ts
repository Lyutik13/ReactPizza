export type Pizza = {
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

export interface PizzasSliceState {
	items: Pizza[];
	status: Status;
}

export type SearchPizzaParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	paginatePage: string;
};
