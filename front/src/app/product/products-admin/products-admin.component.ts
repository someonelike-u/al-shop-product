import { Component } from '@angular/core';
import { Product } from 'app/product/i-product';
import { ProductService } from '../product.service';
import { CrudItemOptions } from 'app/shared/utils/crud-item-options/crud-item-options.model';
import { ControlType } from 'app/shared/utils/crud-item-options/control-type.model';
import { concatMap, forkJoin } from 'rxjs';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent {

  products: Array<Product>;
  entity = Product;

  tableConfig: Array<CrudItemOptions> = [
    {
      key: 'id',
      label: 'ID',
      controlType: ControlType.INPUT,
      columnOptions: { sortable: false, default: false },
      type: 'number',
      controlOptions: { disableOnUpdate: true, hideOnCreate: true }
    },
    {
      key: 'code',
      label: 'Code',
      controlType: ControlType.INPUT,
      columnOptions: { sortable: true, default: true },
      type: 'text',
      controlOptions: { hideOnCreate: true }
    },
    {
      key: 'name',
      label: 'Name',
      controlType: ControlType.INPUT,
      columnOptions: { sortable: true, default: true },
      type: 'text',
      controlOptions: { validators: [Validators.required] }
    },
    {
      key: 'description',
      label: 'Description',
      controlType: ControlType.INPUT,
      columnOptions: { sortable: false, default: false },
      type: 'text',
      controlOptions: { validators: [Validators.required] }
    },
    {
      key: 'price',
      label: 'Price',
      controlType: ControlType.INPUT,
      columnOptions: { sortable: false, default: false },
      type: 'number',
      controlOptions: { validators: [Validators.required] }
    },
    {
      key: 'quantity',
      label: 'Quantity',
      controlType: ControlType.INPUT,
      columnOptions: { sortable: false, default: false },
      type: 'number',
      controlOptions: { validators: [Validators.required] }
    },
    {
      key: 'inventoryStatus',
      label: 'Inventory status',
      controlType: ControlType.INPUT,
      columnOptions: { sortable: false, default: false },
      type: 'text',
      controlOptions: { validators: [Validators.required] }
    },
    {
      key: 'category',
      label: 'Category',
      controlType: ControlType.INPUT,
      columnOptions: { sortable: false, default: false },
      type: 'text',
      controlOptions: { validators: [Validators.required] }
    },
    {
      key: 'image',
      label: 'Image',
      controlType: ControlType.INPUT,
      columnOptions: { sortable: false, default: false },
      type: 'text'
    },
    {
      key: 'rating',
      label: 'Rating (1 to 5)',
      controlType: ControlType.INPUT,
      columnOptions: { sortable: false, default: false },
      type: 'number',
      controlOptions: { validators: [Validators.min(1), Validators.max(5)] }
    },

  ];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsForPublic().subscribe(products => {
      this.products = products;
      this.productService.setProducts(this.products);
    });
  }

  onSave(product: Product) {
    if (!product.id) {
      this.productService.addProduct(product).pipe(
        concatMap(() => {
          return this.productService.getProducts();
        })
      ).subscribe(products => {
        this.productService.setProducts(products);
        this.products = products;
      });
      return;
    }

    this.productService.updateProduct(product).subscribe(products => {
      this.productService.setProducts(products);
      this.products = products;
    });
  }

  onDelete(values: Array<number>) {
    const observables = values.map(number => this.productService.deleteProduct(number));

    forkJoin(observables).subscribe(() => {
      this.productService.getProducts().subscribe(products => {
        this.productService.setProducts(products);
        this.products = products;
      });
    });
  }
}
