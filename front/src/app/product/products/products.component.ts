import { Component, OnInit } from '@angular/core';
import { Product } from 'app/product/i-product';
import { SelectItem } from 'primeng/api';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[];

  sortOptions: SelectItem[] = [
    { label: 'Price High to Low', value: 'desc-price' },
    { label: 'Price Low to High', value: 'asc-price' }
  ];
  sortField: string;
  sortKey: string = 'name';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsForPublic().subscribe(products => {
      this.products = products;
      this.productService.setProducts(this.products);
    });
  }
}
