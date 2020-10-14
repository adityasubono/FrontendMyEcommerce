import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {productModel} from '../model/product.model';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  AllProducts = new BehaviorSubject<productModel[]>(null);

  constructor( private http: HttpClient ) { }
  private baseUrl = 'http://localhost::8000/api/';

  public add(form) {
    return this.http.post(this.baseUrl + 'add', form);
  }

  public delete(id) {
    return this.http.post(this.baseUrl + 'delete?id=' + id, null);
  }

  public update(form) {
    return this.http.post(this.baseUrl + 'update', form);
  }

  public getFromDb(keys) {
    return this.http.post(this.baseUrl + 'show?keys=' + keys, null)
      .subscribe(res => {
        const r: any = res;
        this.AllProducts.next(r.products);
      });
  }
}
