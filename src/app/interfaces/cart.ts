import { Product } from "./product";

export interface Cart {
	items: CartItem[];
	subtotal: number;
	total: number;
	numberOfItems: number;
}

export interface CartItem {
	product: Product;
	quantity: number;
	price: number;
	id?: string;
}
