import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {
  cartProducts: any[] = [];
  totalPrice: number = 0;
  success: boolean = false;
  constructor(private cartService: CartsService) { }
  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
    console.log(this.cartProducts);
    this.getTotalPrice()
  }
  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getTotalPrice();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
  minsAmount(index: number) {
    this.cartProducts[index].quantity--;
    this.getTotalPrice()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));

  }
  changeAmount(index: number) {
    this.getTotalPrice()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));

  }
  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.getTotalPrice()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
  clearCart() {
    this.cartProducts = [];
    localStorage.removeItem("cart");
    this.getTotalPrice()
  }
  getTotalPrice() {
    this.totalPrice = 0;
    this.cartProducts.forEach((product) => {
      this.totalPrice += product.addedProduct.price * product.quantity;
    });
  }
  sendDataToApi() {
    let productsForApi = this.cartProducts.map(product => {
      return {
        productId: product.addedProduct.id,
        quantity: product.quantity
      }
    });
    let modal = {
      userId: 5,
      date: new Date(),
      products: productsForApi
    }
    // console.log(modal);
    this.cartService.sendCartProducts(modal).subscribe({
      next: (res) => {
        res = modal;
        this.success = true;
        console.log(res);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
