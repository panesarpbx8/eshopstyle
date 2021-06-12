import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav>
      <div class="left-nav">
        <a routerLink="" class="logo">EShopStyle</a>
        <div class="left-nav-inner">
          <a routerLink="/collections">Shop All</a>
          <a routerLink="/about">About</a>
        </div>
      </div>
      <div class="center-nav">
        <input type="text" name="search" placeholder="Search for products" autocomplete="off">
      </div>
      <div class="right-nav">
        <a (click)="showCart = true">
          <img src="assets/img/cart.svg" alt="cart" loading="lazy" height="25" width="25">
        </a>
        <a *ngIf="auth.user$ | async as user; else noUser" routerLink="/user">
          <img class="user-image" [src]="user.photoURL" [alt]="user.displayName" loading="lazy" height="35" width="35">
        </a>
        <ng-template #noUser>
          <a routerLink="/login">
            <img src="assets/img/user.svg" alt="user" class="user-image" loading="lazy" height="35" width="35">
          </a>
        </ng-template>
      </div>
    </nav>

    <div class="cart-overlay" *ngIf="showCart" (click)="closeCart($event)">
      <div class="cart">
        <app-cart (close)="showCart = false"></app-cart>
      </div>
    </div>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showCart: boolean;

  constructor(public auth: AuthService) { 
    document.onscroll = () => {
      document.querySelector('nav')
        .classList.toggle('scrolled', document.scrollingElement.scrollTop > document.querySelector('nav').offsetHeight)      
    }
  }

  ngOnInit(): void {
  }

  closeCart(e: any) {
		if (e.target !== e.currentTarget) { return; }
		this.showCart = false;
  }

}
