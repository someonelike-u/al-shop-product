import { Injectable } from '@angular/core';
import { Product } from './i-product';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Array<Product>;

  private API_URL = 'http://localhost:3000';
  private PRODUCTS_ROUTE = '/products'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    if (!this.products) {
      // In LOCAL: this.http.get<any>('assets/products.json')
      return this.http.get<any>(`${this.API_URL}${this.PRODUCTS_ROUTE}`).pipe(
        map(response => {
          this.products = response as Array<Product>;
          return this.products;
        }),
        catchError(error => {
          console.error('Error: ', error);
          return of([] as Array<Product>);
        })
      );
    }
    return of(this.products);

  }
}