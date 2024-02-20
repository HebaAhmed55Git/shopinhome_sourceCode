import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseURL:string = 'https://ecommerce.routemisr.com/';
  numOfCartItems:BehaviorSubject<any> = new BehaviorSubject(null);
  userHeader:any = {token:localStorage.getItem("userToken")}

  constructor(private _HttpClient:HttpClient) { 

    if( localStorage.getItem("userToken") !=null )
    {
      this.getAllCartAPI().subscribe({
        next : (res)=>{  this.numOfCartItems.next(res.numOfCartItems) }
      })
    }

    
  }

  AddCartAPI(pId:string|undefined):Observable<any>
  {
    return this._HttpClient.post(`${this.baseURL}api/v1/cart` , {productId : pId})
  }

  

  updateCartItemsAPI(pID:string|null|undefined , pCount:string):Observable<any>
  {
    return this._HttpClient.put(`${this.baseURL}api/v1/cart/${pID}` , {count : pCount})
  }


  getAllCartAPI():Observable<any>
  {
    return this._HttpClient.get(`${this.baseURL}api/v1/cart`)
  }


  removeCartItemAPI(pId:string|null|undefined):Observable<any>
  {
    return this._HttpClient.delete(`${this.baseURL}api/v1/cart/${pId}`)
  }

  clearUserCartAPI():Observable<any>
  {
    return this._HttpClient.delete(`${this.baseURL}api/v1/cart`)
  }

  onLinePaymentAPI(cartID:string|null , formValue:any):Observable<any>
  {
    
    return this._HttpClient.post(`${this.baseURL}api/v1/orders/checkout-session/${cartID}?url=${window.location.origin}` , {
      shippingAddress:formValue,
  })
  }
}
