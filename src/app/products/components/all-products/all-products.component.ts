import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { products } from '../../models/products';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products: products[] = [];
  categories: string[] = [];
  categoryName: string = "";
  loading: boolean = false;
  // product: any = {};
  cartProducts: any[] = []
  constructor(private service: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
    // this.getProductsByName();
    this.getCategories()
  }
  getProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe({
      next: (res: any) => { // Call getAllProducts() and then subscribe
        this.products = res;
        this.loading = false;
        console.log(this.products);
      },
      error: (err: any) => {
        this.loading = true;
        console.log("getProducts() error function" + err);
      }
    })
  }
  getCategories() {
    this.loading = true;
    this.service.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
        this.loading = false;
        console.log(this.categories);
      },
      error: (err: any) => {
        console.log("getCategories() error function" + err);
      }
    })
  }
  getProductsByCName(catName: any) {
    this.loading = true;
    this.categoryName = catName.target.value;
    if (this.categoryName === "all") {
      this.getProducts();
      this.loading = false;
    } else {
      this.loading = true;
      this.service.getProductsByCatName(this.categoryName).subscribe({
        next: (res: any) => {
          this.products = res;
          this.loading = false;
          console.log(res);
        },
        error: (err: any) => {
          this.loading = true;
          console.log("getProductsByName() error function" + err);
        }
      })

    }
  }
  addToCartFn(event: any) {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find((item: any) => item.addedProduct.id == event.addedProduct.id);
      if (exist) {
        alert("Product already in cart");
      } else {
        this.cartProducts.push(event);
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      }
    }
    else {
      this.cartProducts.push(event);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
    console.log(event);
    // this.product = event.target.value;
  }

}
