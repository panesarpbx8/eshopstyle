import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';

type SortMethod = 'highToLow' | 'lowToHigh' | 'none';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  products$: Observable<Product[]>;

  selectedCategoryId: number = 1;
  selectedSortMethodId: number = 1;

  constructor(public products: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.products.sort(this.products.all$, this.selectedSortMethodId);
  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;

    if (id === 1) this.products$ = this.products.all$;
    else this.products$ = this.products.select(id);
  }

  selectSortMethod(id: number) {
    this.selectedSortMethodId = id;
    this.products$ = this.products.sort(this.products$, id);
  }
}
