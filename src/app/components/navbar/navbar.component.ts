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
          <a routerLink="">Tech</a>
        </div>
      </div>
      <div class="center-nav">
        <input type="text" name="search" placeholder="Search for products" autocomplete="off">
      </div>
      <div class="right-nav">
        <a routerLink="">
          <img src="assets/img/cart.svg" alt="cart" loading="lazy" height="25" width="25">
        </a>
        <a routerLink="">
          <img src="assets/img/heart.svg" alt="wishlist" loading="lazy" height="22" width="22">
        </a>
        <a *ngIf="auth.user$ | async as user" routerLink="">
          <img class="user-image" [src]="user.photoURL" [alt]="user.displayName" loading="lazy" height="35" width="35">
        </a>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService) { 
    document.onscroll = () => {
      document.querySelector('nav')
        .classList.toggle('scrolled', document.scrollingElement.scrollTop > document.querySelector('nav').offsetHeight)      
    }
  }

  ngOnInit(): void {
  }

}
