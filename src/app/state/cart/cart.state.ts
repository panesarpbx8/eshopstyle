import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Cart } from '../../interfaces/cart';
import { AddItem, CalculatePrice, DownQuantity, PlaceOrder, RemoveItem, Save, SetNumberItems, UpdateItem, UpQuantity } from './cart.actions';
import { v4 as uuid } from 'uuid';


let initialState: Cart = {
	items: [],
	subtotal: 0.00,
	total: 0.00,
	numberOfItems: 0,
}

if (localStorage['cart']) {
	initialState = JSON.parse(localStorage['cart']) || initialState;
}

@State<Cart>({
	name: 'cart',
	defaults: initialState,
})
@Injectable({ providedIn: 'root' })
export class CartState {

	@Action(AddItem)
	addItem(ctx: StateContext<Cart>, { item }: AddItem) {
		item.id = uuid();
		const items = [...ctx.getState().items, item];
		
		ctx.patchState({ items });
		
		ctx.dispatch([
			new CalculatePrice(),
			new SetNumberItems(),
			new Save(),
		]);
	}

	@Action(UpdateItem)
	updateItem(ctx: StateContext<Cart>, { item }: UpdateItem) {
		const items = [...ctx.getState().items];
		const index = items.findIndex(i => i.id === item.id);
		items[index] = item;

		ctx.patchState({ items });

		ctx.dispatch([
			new CalculatePrice(),
			new SetNumberItems(),
			new Save(),
		]);
	}

	@Action(RemoveItem)
	removeItem(ctx: StateContext<Cart>, { itemId }: RemoveItem) {
		const items = [...ctx.getState().items];
		const index = items.findIndex(i => i.id === itemId);
		items.splice(index, 1);

		ctx.patchState({ items });
		
		ctx.dispatch([
			new CalculatePrice(),
			new SetNumberItems(),
			new Save(),
		]);
	}

	@Action(UpQuantity)
	upQuantity(ctx: StateContext<Cart>, { item }: UpQuantity) {
		const items = [...ctx.getState().items];

		const index = items.findIndex(i => i.id === item.id);
		const itemFound = { ...items[index] };
		itemFound.quantity = itemFound.quantity + 1;
  
		items[index] = itemFound;

		ctx.patchState({ items });

		ctx.dispatch([
			new CalculatePrice(),
			new SetNumberItems(),
			new Save(),
		]);
	}

	@Action(DownQuantity)
	downQuantity(ctx: StateContext<Cart>, { item }: DownQuantity) {
		const items = [...ctx.getState().items];

		const index = items.findIndex(i => i.id === item.id);
		const itemFound = { ...items[index] };
		itemFound.quantity = itemFound.quantity - 1;
  
		items[index] = itemFound;

		ctx.patchState({ items });

		ctx.dispatch([
			new CalculatePrice(),
			new SetNumberItems(),
			new Save(),
		]);
	}

	@Action(CalculatePrice)
	calculatePrice(ctx: StateContext<Cart>) {
		const state = ctx.getState();
		let subtotal = 0.00, total = 0.00, tax = 0.13;
	
		for (const item of state.items)
			subtotal = subtotal + (item.price * item.quantity); 
	
		total = subtotal + (subtotal * tax);

		ctx.setState({...state, subtotal, total });
	}

	@Action(Save)
	save(ctx: StateContext<Cart>) {
		localStorage['cart'] = JSON.stringify(ctx.getState());
	}
	
	@Action(SetNumberItems)
	getTotalCartItems(ctx: StateContext<Cart>) {
		let numberOfItems = 0;
		if (ctx.getState().items)
			ctx.getState().items.forEach(i => numberOfItems = numberOfItems + i.quantity);
		
		ctx.patchState({ numberOfItems })
	}

	@Action(PlaceOrder)
	placeOrder(ctx: StateContext<Cart>) {
		ctx.dispatch(new Save());

		ctx.setState({
			items: [],
			subtotal: 0.00,
			total: 0.00,
			numberOfItems: 0,
		});

	}

}
