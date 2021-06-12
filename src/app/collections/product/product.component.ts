import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

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
    private cartService: CartService,
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
    this.cartService.addItem(item);
  }

}
