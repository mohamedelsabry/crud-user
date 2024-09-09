import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  base: string = 'https://fakestoreapi.com/';
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(environment.baseApi + 'products');
  }
  getProductsByCatName(catName: string) {
    return this.http.get(environment.baseApi + 'products/category/' + catName);
  }
  getCategories() {
    return this.http.get(environment.baseApi + 'products/categories/');
  }
  getProductById(id: number) {
    return this.http.get(environment.baseApi + 'products/' + id);
  }

}
