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
    return this.httpClient.get('/api/products').pipe(map(data => {
      const products: Product[] = [];
      (data as any[]).forEach(line => {
        products.push(ProductService.dataAsProduct(line));
      })
      return products;
    }));
  }

  public getById(id: string): Observable<Product> {
    return this.httpClient.get(`/api/product/${id}`).pipe(map(data => ProductService.dataAsProduct(data)));
  }

  static dataAsProduct(data: any): Product {
    const product = new Product();
    product.id = data.id;
    product.productName = data.productName;
    product.specialOffer = data.specialOffer;
    product.normalPrice = data.normalPrice;
    product.imageName = data.imageName;
    product.description = data.description;
    return product;
  }
}
