import { Injectable } from '@angular/core';
import { Cart, CartItem, initialState } from '../interfaces/cart';
import { v4 as uuid } from 'uuid';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({ providedIn: 'root' })
export class CartService {

  private state: Cart = initialState;

  constructor(private toast: HotToastService) { 
    if (null == JSON.parse(localStorage['cart'] || null)) {
      localStorage['cart'] = JSON.stringify(this.state); 
    } else {
			this.state = JSON.parse(localStorage['cart']);
		}
  }

  addItem(item: CartItem) {
    item.id = uuid().toString();
    this.state.items.push(item);
    this.calculatePrice();
    this.save();
    this.toast.success('Added to cart!', { duration: 3000 });
  } 

  removeItem(item: CartItem) {
    this.state.items = this.state.items.filter(i => i.id !== item.id);
    this.calculatePrice();
    this.save();
    this.toast.success('Item removed from cart', { duration: 3000 });
  }

  updateItem(item: CartItem) {
    const index = this.state.items.findIndex(i => i.id === item.id);
    this.state.items[index] = item;
    this.calculatePrice();
    this.save();
  }

  placeOrder() {
    this.state = initialState;
    this.save();
    this.toast.success('Order Placed!', { duration: 3000 });
  }

  calculatePrice() {
    let subtotal = 0.00;
    let total = 0.00;
    const TAX = 0.13;

    this.state.items.forEach(item => {
      subtotal = subtotal + (item.price * item.quantity); 
    })

    total = subtotal + (subtotal * TAX);

    this.state.subtotal = subtotal;
    this.state.total = total;
  }
	
	save(): void {
    this.state.lastUpdated = new Date();
		localStorage['cart'] = JSON.stringify(this.state);
	}

  get value() {
    return this.state;
  }

  get totalCartItems() {
    let n = 0;
    if (this.state.items) {
      this.state.items.forEach(i => n = n + i.quantity);
    }
    return n;
  }
}
