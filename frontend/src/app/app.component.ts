import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from './cart.service';
import { Cart } from '../../../models/Cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[];
  cart: any;
  title = 'dorfladen';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.cartService.cartChange.subscribe((cart: Cart) => this.cart = cart)
    ];
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe(cart => {this.cart = cart; const total =cart.total;});
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
