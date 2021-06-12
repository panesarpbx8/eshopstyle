import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Cart, CartItem } from 'src/app/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  template: `
    <div class="cart">
      <div class="close" (click)="close.emit()">
        <img src="assets/img/close.svg" alt="close" height="20" width="20">
      </div>
      <h1>My Cart</h1>
      <div class="items">
        <div *ngIf="cart.items.length === 0" class="empty">
          <p>Your cart is empty!</p>
          <p><a (click)="close.emit()" routerLink="/collections">Browse products</a></p>
        </div>
        <div *ngFor="let item of cart.items" class="item">
          <img [src]="item.product.photoURL" alt="item" loading="lazy">
          <div class="product">
            <p class="name">{{ item.product.name }}</p>
            <div class="quantity">
              <span (click)="downQuantity(item)"><img src="assets/img/minus.svg" loading="lazy" alt="down"></span>
              <div>{{ item.quantity }}</div>
              <span (click)="upQuantity(item)"><img src="assets/img/plus.svg" loading="lazy" alt="up"></span>
            </div>
          </div>
          <div class="action">
            <p class="price">{{ '$'+item.price }} CAD</p>
            <div class="delete-icon" (click)="remove(item)">
              <img src="assets/img/delete.svg" alt="delete" loading="lazy">
            </div>
          </div>
        </div>
      </div>
      <div class="pricing" *ngIf="cart.items.length !== 0">
        <div>
          <span>{{ '$'+cart.subtotal.toFixed(2) }} CAD</span>
          Subtotal
        </div>
        <div>
          <span>{{ '$'+(cart.subtotal * 0.13).toFixed(2) }} CAD</span>
          Taxes
        </div>
        <div>
          <span>FREE</span>
          Estimated Shipping
        </div>
      </div>
      <div class="total" *ngIf="cart.items.length !== 0">
        <span>{{ '$'+cart.total.toFixed(2) }} CAD</span>
        Total
      </div>
      <div class="proceed" *ngIf="cart.items.length !== 0">
        <button (click)="close.emit()" routerLink="/checkout">Proceed to checkout</button>
      </div>
    </div>
  `,
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Output() close = new EventEmitter();

  cart: Cart = this.cartService.value;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  upQuantity(item: CartItem) {
    item.quantity++;
    this.cartService.updateItem(item);
  }

  downQuantity(item: CartItem) {
    if (item.quantity === 1) return;
    item.quantity--;
    this.cartService.updateItem(item);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item);
  }

}
