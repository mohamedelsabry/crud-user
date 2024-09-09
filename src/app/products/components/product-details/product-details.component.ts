import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  data: any;
  loading: boolean = false;
  constructor(private route: ActivatedRoute, private proService: ProductsService) {

  }
  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.loading = true;
    let id = this.route.snapshot.params['id'];
    console.log(id);
    return this.proService.getProductById(id).subscribe({
      next: (res) => {
        this.loading = false
        this.data = res
        // console.log(res);
      },
      error: (err) => {
        this.loading = false
        console.log(err);
      }
    });
  }
}
