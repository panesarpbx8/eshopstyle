import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
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

  get(id: string): Observable<Product> {
    return this.all$.pipe(
      map(products => products.find(p => p.id === id)),
    );
  }

  getAllByIds(ids: string[]): Observable<Product[]> {
    return this.all$.pipe(
      
    );
  }

  select(categoryId: number): Observable<Product[]> {
    return this.all$.pipe(
      map(products => products.filter(p => p.categoryId === categoryId)),
    )
  }

  getCategoryName(id: number) {
    return this.categories.filter(c => c.id === id)[0].name.toLowerCase();
  }

  sort1(products$: Observable<Product[]>, sortMethodId: number) {
    return products$.pipe(
      map(products => {
        const method = this.sortMethods.filter(s => s.id === sortMethodId)[0].name;
        
        if (method === 'HTL') { // High to low
          return products.sort((a, b) => b.price - a.price);
        } 
        if (method === 'LTH') { // Low to high
          return products.sort((a, b) => a.price - b.price);
        } 
        return of(products);
      })
    )
  }

  sort(products$: Observable<Product[]>, sortMethodId: number) {
    return products$.pipe(
      switchMap((products) => {
        const method = this.sortMethods.filter(s => s.id === sortMethodId)[0]?.name || 'NONE';
        switch (method) {
          case 'HTL': return products$.pipe(map(products => products.sort((a, b) => b.price - a.price)));
          
          case 'LTH': return products$.pipe(map(products => products.sort((a, b) => a.price - b.price)));

          case 'NONE': return of(products);
        }
      })
    );
  }


}
