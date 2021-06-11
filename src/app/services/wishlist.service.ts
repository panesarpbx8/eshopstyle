import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WishlistService {

  constructor() { }

  add(id: string): void {
    this.get().push(id);
    const set = new Set(this.get());
    this.set([...set]);
  }

  remove(id: string) {
    let wishlist = this.get();
    wishlist = wishlist.filter(i => i !== id);
    this.set(wishlist);
  } 
  
  get(): string[] {
    return JSON.parse(localStorage['wishlist']);
  }

  private set(wishlist: string[]): void {
    localStorage['wishlist'] = JSON.stringify(wishlist);
  } 

}
