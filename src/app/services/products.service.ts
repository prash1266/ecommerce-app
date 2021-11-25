import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart, Products } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsData: Subject<Products[]> = new Subject();
  cart: Cart[] = [];
  private cartData: BehaviorSubject<Cart[]> = new BehaviorSubject(this.cart);

  constructor(private http: HttpClient) {}

  getProducts() {
    this.http.get<Products[]>(`assets/products.json`).subscribe((response) => {
      this.productsData.next(response);
    });
  }

  getProductsUpdate() {
    return this.productsData.asObservable();
  }

  getCart() {
    let data = localStorage.getItem('cart');
    if (data) {
      let cart = JSON.parse(data);
      this.cartData.next(cart);
    }
  }

  getCartUpdate() {
    return this.cartData.asObservable();
  }

  setCartData(cart: Cart[]) {
    const data = JSON.stringify(cart);
    localStorage.setItem('cart', data);
    this.cartData.next(cart);
  }
}
