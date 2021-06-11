import { Product } from "./product";

export interface Cart {
	items: CartItem[];
	lastUpdated: Date; 
	subtotal: number;
	total: number;
}

export interface CartItem {
	product: Product;
	quantity: number;
	price: number;
	id?: string;
}

export const initialState: Cart = {
	items: [],
	lastUpdated: new Date(),
	subtotal: 0.00,
	total: 0.00,
}
