import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseURL:string = 'https://ecommerce.routemisr.com/';

  constructor(private _HttpClient:HttpClient) { }
  
  getProductsAPI(page:number=1):Observable<any>
  {
    return this._HttpClient.get(`${this.baseURL}api/v1/products?page=${page}`)
  }

  getSpecProdAPI(pId:string):Observable<any>
  {
    return this._HttpClient.get(`${this.baseURL}api/v1/products/${pId}`)
  }

  getCategoriesAPI():Observable<any>
  {
    return this._HttpClient.get(`${this.baseURL}api/v1/categories`)
  }
  
}
