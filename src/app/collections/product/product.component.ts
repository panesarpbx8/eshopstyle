import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
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
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.product$ = this.products.get(id);
  }

  getCategoryName(id: number) {
    return this.products.getCategoryName(id);
  }

}
