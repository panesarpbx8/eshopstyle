import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Cart } from '../interfaces/cart';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

type CheckoutState = 'user-info' | 'address' | 'payment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  allowedStates: CheckoutState[] = ['user-info'];

  email: string;
  emailErrorMessage: string;
  emailRegex: RegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  shippingForm: FormGroup;
  paymentForm: FormGroup;

  cart: Cart = this.cartService.value;

  constructor(
    public auth: AuthService,
    private cartService: CartService,
    private builder: FormBuilder,
    private title: Title,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('EShopStyle | Checkout');
    this.shippingForm = this.builder.group({
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      country: ['', [Validators.required]],
      postal: ['', [Validators.required]],
    });

    this.paymentForm = this.builder.group({
      cardNumber: ['', [
        Validators.required, 
        Validators.maxLength(16), 
        Validators.minLength(16),
      ]],
      cvv: ['', [
        Validators.required,
        Validators.maxLength(3), 
        Validators.minLength(3),
      ]],
      exp: ['', [
        Validators.required, 
        Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/),
      ]],
    });
  }

  verifyEmail() {
    if (this.emailRegex.test(this.email)) {
      return true;
    } else {
      this.emailErrorMessage = 'Please enter a valid email address';
      return false;
    }
  }

  continueToShipping(user?: User) {
    if (user || this.verifyEmail()) {
      this.allowedStates.push('address');
    }
  }

  continueToPayment() {
    if (this.shippingForm.valid) {
      this.allowedStates.push('payment');
    }
  }

  clearEmailError() {
    this.emailErrorMessage = null;
  }

  placeOrder() {
    this.cartService.placeOrder();
  }

  get addressField() {
    return this.shippingForm.get('address');
  }
  get cityField() {
    return this.shippingForm.get('city');
  }
  get provinceField() {
    return this.shippingForm.get('province');
  }
  get countryField() {
    return this.shippingForm.get('country');
  }
  get postalField() {
    return this.shippingForm.get('postal');
  }
  get cardNumberField() {
    return this.paymentForm.get('cardNumber');
  }
  get cvvField() {
    return this.paymentForm.get('cvv');
  }
  get expField() {
    return this.paymentForm.get('exp');
  }

}
