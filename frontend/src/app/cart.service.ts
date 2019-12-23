import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, CartPosition } from '../../../models/Cart';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../../models/Product';
import { ProductService } from './product.service';

const CART_CHANGE_EVENT = new EventEmitter<Cart>();

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartChange: EventEmitter<Cart> = CART_CHANGE_EVENT; 

  constructor(private httpClient: HttpClient) { }

  getCart(): Observable<Cart> {
    return this.httpClient.get('/api/cart').pipe(map(this.dataToCart));
  }

  addToCart(product: Product) {
    this.httpClient.get(`/api/cart/add/${product.id}`).subscribe((data) => this.cartChange.emit(this.dataToCart(data)));
  }

  removeFromCart(product: Product) {
    this.httpClient.get(`/api/cart/remove/${product.id}`).subscribe((data) => this.cartChange.emit(this.dataToCart(data)));
  }

  removeAllFromCart(product: Product) {
    this.httpClient.get(`/api/cart/removeAll/${product.id}`).subscribe((data) => this.cartChange.emit(this.dataToCart(data)));
  }

  private dataToCart(data: any) {
      const cart = new Cart();
      (data as any).positions.forEach(dataPosition => {
        const position = new CartPosition(ProductService.dataAsProduct(dataPosition.product), dataPosition.count);
        cart.positions.push(position);
      })
      return cart;
  }
}
