import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { AddItem } from 'src/app/state/cart/cart.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product$: Observable<Product>;
  
  constructor(
    private route: ActivatedRoute,
    private products: ProductService,
    private store: Store,
    private title: Title,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.product$ = this.products.get(id);
    this.title.setTitle('EShopStyle | Product');
  }

  getCategoryName(id: number) {
    return this.products.getCategoryName(id);
  }

  addToCart(product: Product) {
    const item: CartItem = {
      price: product.price,
      product: product,
      quantity: 1,
    };
    this.store.dispatch(new AddItem(item));
  }

}
