import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../interfaces/product';
import { data } from './data';

@Injectable({ providedIn: 'root' })
export class ProductService {

  products$: Observable<Product[]>;

  constructor() { 
    this.products$ = of(data);
  }
  
}
