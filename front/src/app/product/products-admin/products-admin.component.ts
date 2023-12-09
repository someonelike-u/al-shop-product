import { Component } from '@angular/core';
import { Product } from 'app/product/i-product';
import { ProductService } from '../product.service';
import { CrudItemOptions } from 'app/shared/utils/crud-item-options/crud-item-options.model';
import { ControlType } from 'app/shared/utils/crud-item-options/control-type.model';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent {

  products: Product[];

  tableConfig: Array<CrudItemOptions> = [
    {
      key: 'code',
      label: 'Code',
      controlType: ControlType.INPUT,
      columnOptions: { sortable: true, default: true }

    },
    {
      key: 'name',
      label: 'Name',
      controlType: ControlType.INPUT,
      columnOptions: { sortable: true, default: true }
    }
  ];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
}
