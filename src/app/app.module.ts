import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddheaderInterceptor } from './Model/interceptor/addheader.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";

// Import from library
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { LoadingScreenInterceptor } from './Model/interceptor/loading-screen.interceptor';


@NgModule({
  declarations: [
    AppComponent 
    ],
  imports: [
    BrowserModule,NgxSpinnerModule,
    AppRoutingModule , HttpClientModule , BrowserAnimationsModule ,NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot() // Needed for instantiating toast notifications.
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AddheaderInterceptor,
      multi:true
    },
  {
    provide:HTTP_INTERCEPTORS,
    useClass:LoadingScreenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
