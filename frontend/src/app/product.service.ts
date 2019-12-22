import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Product } from '../../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  public getAllProducts(): Observable<Product[]> {
    return this.httpClient.get('/api/products').pipe(map(data => data as Product[]));
  }

  public getById(id: string): Observable<Product> {
    return this.httpClient.get(`/api/product/${id}`).pipe(map(data => data as Product));
  }
}
