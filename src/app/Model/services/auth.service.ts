import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Auth} from '../interfaces/auth'
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL:string = 'https://ecommerce.routemisr.com/';

  userDataVar : BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient , _Router:Router) { 

    // // /cart , /products
    // if(localStorage.getItem("currentPage"))
    // {
    //   _Router.navigate([  localStorage.getItem("currentPage")   ])
    // }

  }

  registerAPI(regData:Auth):Observable<any>
  {
    return this._HttpClient.post(`${this.baseURL}api/v1/auth/signup` , regData);
  }

  loginAPI(loginData:Auth):Observable<any>
  {
    return this._HttpClient.post(`${this.baseURL}api/v1/auth/signin` , loginData);
  }

  forgetAPI(rData:Auth):Observable<any>
  {
    return this._HttpClient.post(`${this.baseURL}api/v1/auth/forgotPasswords` , rData  )
  }

  verifyAPI(rData:Auth):Observable<any>
  {
    return this._HttpClient.post(`${this.baseURL}api/v1/auth/verifyResetCode` , rData  )
  }

  newPassAPI(rData:Auth):Observable<any>
  {
    return this._HttpClient.put(`${this.baseURL}api/v1/auth/resetPassword` , rData  )
  }


  //save and share user data
  saveDataMethod()
  {
    if( localStorage.getItem("userToken") != null )
    {
      this.userDataVar.next(localStorage.getItem("userToken"))  ;
      this.userDataVar.next(jwtDecode(this.userDataVar.getValue())) ;
    }
    else
    {
      this.userDataVar.next(null)
    }

  }

}
