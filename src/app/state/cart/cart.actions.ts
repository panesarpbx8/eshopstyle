import { CartItem } from "../../interfaces/cart";

export class AddItem {
	static readonly type = '[cart] add item';
	constructor(public item: CartItem) {}
}

export class UpdateItem {
	static readonly type = '[cart] update item';
	constructor(public item: CartItem) {}
}

export class RemoveItem {
	static readonly type = '[cart] remove item';
	constructor(public itemId: string) {}
}

export class UpQuantity {
	static readonly type = '[cart] up quantity';
	constructor(public item: CartItem) {}
}

export class DownQuantity {
	static readonly type = '[cart] down quantity';
	constructor(public item: CartItem) {}
}

export class CalculatePrice {
	static readonly type = '[cart] calculate price';
	constructor() {}
}

export class Save {
	static readonly type = '[cart] save';
	constructor() {}
}

export class SetNumberItems {
	static readonly type = '[cart] set number items';
	constructor() {}
}

export class PlaceOrder {
	static readonly type = '[cart] place order';
	constructor() {}
}