import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart, Products } from '../models/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private productsInfo: Subscription = new Subscription();
  products: Products[] = [];
  productsCopy: Products[] = [];
  categories: string[] = [];
  selectCategory: string = '';
  private cartInfo: Subscription = new Subscription();
  cart: Cart[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts();
    this.productsService.getCart();
    this.productsInfo = this.productsService
      .getProductsUpdate()
      .subscribe((response) => {
        this.products = response;
        this.productsCopy = [...this.products];
        this.products.forEach((element) => {
          if (element.p_category) {
            if (!this.categories.includes(element.p_category)) {
              this.categories.push(element.p_category);
            }
          }
        });
      });
    this.cartInfo = this.productsService
      .getCartUpdate()
      .subscribe((response) => {
        this.cart = response;
      });
  }

  categoryChange() {
    this.productsCopy = this.products.filter(
      (element) => element.p_category === this.selectCategory
    );
  }

  clearFilter() {
    this.selectCategory = '';
    this.productsCopy = [...this.products];
  }

  checkCart(item: Products) {
    if (this.cart.some((element) => element.p_id === item.p_id)) {
      return true;
    } else {
      return false;
    }
  }

  addToCart(item: Products) {
    let product = true;
    this.cart.forEach((element) => {
      if (element.p_id === item.p_id) {
        element.p_qty = element.p_qty + 1;
        product = false;
      }
    });
    if (product) {
      const data: Cart = {
        p_name: item.p_name,
        p_id: item.p_id,
        p_cost: item.p_cost,
        p_availability: item.p_availability,
        p_details: item.p_details,
        p_category: item.p_category,
        p_qty: 1,
      };
      this.cart.push(data);
    }
    this.productsService.setCartData(this.cart);
  }

  removeFromCart(item: Products) {
    this.cart.forEach((element, index) => {
      if (element.p_id === item.p_id) {
        if (element.p_qty > 1) {
          element.p_qty = element.p_qty - 1;
        } else {
          this.cart.splice(index, 1);
        }
      }
    });
    this.productsService.setCartData(this.cart);
  }

  ngOnDestroy(): void {
    if (this.productsInfo) {
      this.productsInfo.unsubscribe();
    }
    if (this.cartInfo) {
      this.cartInfo.unsubscribe();
    }
  }
}
