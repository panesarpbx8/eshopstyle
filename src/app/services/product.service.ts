import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../interfaces/category';
import { Product } from '../interfaces/product';
import { SortMethod } from '../interfaces/sortmethod';
import { data } from './data';

@Injectable({ providedIn: 'root' })
export class ProductService {

  categories: Category[] = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Women' },
    { id: 3, name: 'Men' },
    { id: 4, name: 'Tech' },
    { id: 5, name: 'Jewelery' },
  ];

  sortMethods: SortMethod[] = [
    { id: 1, name: 'LTH' },
    { id: 2, name: 'HTL' },
  ];

  all$: Observable<Product[]> = of(data);

  select(categoryId: number): Observable<Product[]> {
    return this.all$.pipe(
      map(products => products.filter(p => p.categoryId === categoryId)),
    )
  }

  getCategoryName(id: number) {
    return this.categories.filter(c => c.id === id)[0].name.toLowerCase();
  }

  sort(products$: Observable<Product[]>, sortMethodId: number) {
    return products$.pipe(
      map(products => {
        const method = this.sortMethods.filter(s => s.id === sortMethodId)[0].name;
        if (method === 'HTL') { // High to low
          return products.sort((a, b) => b.price - a.price);
        } else { // Low to high
          return products.sort((a, b) => a.price - b.price);
        }
      })
    )
  }

}
