import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CartComponent } from '../cart/cart.component';
import { Cart } from '../models/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private cartInfo: Subscription = new Subscription();
  cart: Cart[] = [];

  constructor(
    private dialog: MatDialog,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsService.getCart();
    this.cartInfo = this.productsService
      .getCartUpdate()
      .subscribe((response) => {
        this.cart = response;
      });
  }

  openCartDialog() {
    const dialog = this.dialog.open(CartComponent, {
      autoFocus: false,
      minWidth: '300px',
      maxWidth: '500px',
      data: this.cart,
    });

    dialog.afterClosed().subscribe(() => {});
  }
}
