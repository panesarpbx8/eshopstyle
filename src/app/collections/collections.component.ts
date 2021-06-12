import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  products$: Observable<Product[]>;

  selectedCategoryId: number = 1;
  selectedSortMethodId: number = 0;

  constructor(public products: ProductService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('EShopStyle | Shop All');
    this.products$ = this.products.sort(this.products.all$, this.selectedSortMethodId);
  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;

    this.products$ = this.products.sort(
      id === 1 ? this.products.all$ : this.products.select(id), 
      this.selectedSortMethodId
    );
  }

  selectSortMethod(id: number) {
    this.selectedSortMethodId = id;
    this.products$ = this.products.sort(this.products$, id);
  }
}
