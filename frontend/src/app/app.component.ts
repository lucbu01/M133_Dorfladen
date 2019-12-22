import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[];
  cart: any;
  title = 'dorfladen';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.cartService.cartChange.subscribe(() => this.loadCart())
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
