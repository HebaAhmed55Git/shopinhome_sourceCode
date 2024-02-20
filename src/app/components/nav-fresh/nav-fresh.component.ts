import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/Model/services/auth.service';
import { CartService } from 'src/app/Model/services/cart.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddheaderInterceptor } from 'src/app/Model/interceptor/addheader.interceptor';

@Component({
  selector: 'app-nav-fresh',
  standalone: true,
  providers:[{
    provide:HTTP_INTERCEPTORS,
    useClass:AddheaderInterceptor,
    multi:true
  }],
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-fresh.component.html',
  styleUrls: ['./nav-fresh.component.scss']
})
export class NavFreshComponent {

  navNumOfItems:string = ""
  constructor(private _CartService:CartService,private _AuthService:AuthService , private _Router:Router){}

  ngOnInit(): void {
    
    this._CartService.numOfCartItems.subscribe( ()=>{

      this.navNumOfItems =  this._CartService.numOfCartItems.getValue();

      

    } )
    
  }
  
    logout()
    {
      
      localStorage.removeItem("userToken");
      this._AuthService.saveDataMethod();
      this._Router.navigate(['/login'])

    }
}


