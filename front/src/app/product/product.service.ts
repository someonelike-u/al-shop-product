import { Injectable } from '@angular/core';
import { Product } from './i-product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Array<Product>;

  private API_URL = 'http://localhost:3000';
  private PRODUCTS_ROUTE = '/products'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    // In LOCAL: this.http.get<any>('assets/products.json')
    return this.http.get<any>(`${this.API_URL}${this.PRODUCTS_ROUTE}`, this.httpOptions);
  }

  setProducts(products) {
    this.products = products;
  }

  getProductsForPublic() {
    if (!this.products) {
      return this.getProducts();
    }
    return of(this.products);
  }

  findProductByID(id: number) {
    return this.products.find(product => product.id === id);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.API_URL}${this.PRODUCTS_ROUTE}`, product, this.httpOptions);
  }

  updateProduct(product: Product): Observable<Array<Product>> {
    return this.http.patch<Array<Product>>(`${this.API_URL}${this.PRODUCTS_ROUTE}/${product.id}`, product, this.httpOptions);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}${this.PRODUCTS_ROUTE}/${id}`, this.httpOptions);
  }
}