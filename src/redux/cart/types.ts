export type CartItem = {
	id: string;
	name: string;
	price: number;
	types: string;
	sizes: number;
	count: number;
	imageUrl: string;
};

export interface CartSliceState {
	totalPrice: number;
	totalCount: number;
	items: CartItem[];
}
