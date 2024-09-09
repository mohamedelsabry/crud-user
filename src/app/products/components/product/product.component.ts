import { Component, EventEmitter, Input, Output } from '@angular/core';
import { products } from '../../models/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() item!: products;
  @Output() addedProduct = new EventEmitter()
  addQuantity: boolean = false;
  amount: number = 0;
  addToCart() {
    this.addedProduct.emit({ addedProduct: this.item, quantity: this.amount })
  }
}
