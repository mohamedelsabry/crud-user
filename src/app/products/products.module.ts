import { NgModule } from '@angular/core';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { ProductComponent } from './components/product/product.component';



@NgModule({
  declarations: [
    AllProductsComponent,
    ProductDetailsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProductsModule { }
