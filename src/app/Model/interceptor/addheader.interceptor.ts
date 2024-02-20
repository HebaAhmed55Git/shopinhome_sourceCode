import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddheaderInterceptor implements HttpInterceptor {

  userToken:any = localStorage.getItem("userToken") ;
  

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if(this.userToken != null)
    {
      let newRequest = request.clone({
        headers : request.headers.set("token" ,this.userToken )
      })
  
      return next.handle(newRequest);
    }
    else
    {
      return next.handle(request);
    }
  }
}
