import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart } from '../../../../models/Cart';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { Product } from '../../../../models/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[];
  cart: Cart;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.subscriptions = [
      this.cartService.cartChange.subscribe(() => this.loadCart())
    ];
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  addProduct(product: Product) {
    this.cartService.addToCart(product);
  }

  removeProduct(product: Product) {
    this.cartService.removeFromCart(product);
  }

  removeAll(product: Product) {
    this.cartService.removeAllFromCart(product);
  }

}
