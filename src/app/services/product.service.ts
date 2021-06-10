import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product';
import { data } from './data';

@Injectable({ providedIn: 'root' })
export class ProductService {

  all$: Observable<Product[]> = of(data);

  menClothing$: Observable<Product[]> = this.all$.pipe(
    map(products => products.filter(p => p.collectionName === 'men clothing')),
  )
  
  womenClothing$: Observable<Product[]> = this.all$.pipe(
    map(products => products.filter(p => p.collectionName === 'women clothing')),
  )
  
  jewelery$: Observable<Product[]> = this.all$.pipe(
    map(products => products.filter(p => p.collectionName === 'jewelery')),
  )
  
  electronics$: Observable<Product[]> = this.all$.pipe(
    map(products => products.filter(p => p.collectionName === 'electronics')),
  )

}
