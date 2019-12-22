import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../../../models/Cart';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../../models/Product';

const CART_CHANGE_EVENT = new EventEmitter;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartChange: EventEmitter<any> = CART_CHANGE_EVENT; 

  constructor(private httpClient: HttpClient) { }

  getCart(): Observable<Cart> {
    return this.httpClient.get('/api/cart').pipe(map(data => Cart.of(data)));
  }

  addToCart(product: Product) {
    this.httpClient.get(`/api/cart/add/${product.id}`).subscribe(() => this.cartChange.emit());
  }
}
