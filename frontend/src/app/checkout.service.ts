import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators'
import { Product } from '../../../models/Product';
import { ContactData } from '../../../models/ContactData';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient: HttpClient, private cartService: CartService) { }

  checkout(contactData: ContactData): Observable<any> {
    return this.httpClient.post('/api/checkout', contactData, { responseType: 'text' }).pipe(
      tap(data => {
        this.cartService.getCart().subscribe(cart => {
          this.cartService.cartChange.emit(cart);
        });
      })
    );
  }
}
