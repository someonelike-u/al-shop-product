import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { DataViewModule } from 'primeng/dataview';
import { ProductService } from './product.service';

export const PRODUCT_ROUTE: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'admin/products', component: ProductsAdminComponent }
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsAdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PRODUCT_ROUTE),
    SharedModule,
    DataViewModule
  ],
  providers: [ProductService]
})
export class ProductModule { }
