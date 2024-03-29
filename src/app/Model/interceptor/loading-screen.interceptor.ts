import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize ,pipe } from 'rxjs';

@Injectable()
export class LoadingScreenInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.spinner.show();

    return next.handle(request).pipe(  finalize( ()=>{

      this.spinner.hide();
    } ) );
  }
}
