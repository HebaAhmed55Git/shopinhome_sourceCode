import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/Model/services/products.service';

import {Product , Category} from '../../Model/interfaces/product'
import { SubtitlePipe } from 'src/app/Model/pipe/subtitle.pipe';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/Model/services/cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { SearchPipe } from 'src/app/Model/pipe/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule , SubtitlePipe  , CarouselModule , RouterLink, SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allProducts:Product[]=[];
  allCategories:Category[]=[];
  userWord:string="";

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplaySpeed:1000,
    autoplay:true,
    autoplayTimeout:3000,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 10
      }
    },
    nav: true
  }

  customOptions2: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:1000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
      
    },
    nav: true
  }

  constructor(private _ProductsService:ProductsService , private _CartService:CartService,private toastEvokeService: ToastEvokeService){}

  ngOnInit(): void {

    this._ProductsService.getProductsAPI(1).subscribe({

      next : (res)=>{

       this.allProducts =  res.data;

      },
      error :(err)=>{console.log(err)}
    })


    this._ProductsService.getCategoriesAPI().subscribe({
      next : (res)=>{
        this.allCategories = res.data
      },
      error:(err)=>{console.log(err)}
    })

    
    localStorage.setItem("currentPage" , "/home")
    
  }

  addProduct(pId:string|undefined , elem : HTMLElement)
  {
    elem.setAttribute('disabled' , 'true');
    elem.classList.remove('bg-main')
    elem.classList.add('bg-danger');
    
    this._CartService.AddCartAPI(pId).subscribe({
      next:(res)=>{

        elem.removeAttribute('disabled' );
        elem.classList.add('bg-main')
        elem.classList.remove('bg-danger');
        this.toastEvokeService.success('Successfully!', res.message).subscribe();
        this._CartService.numOfCartItems.next(res.numOfCartItems);

      },
      error:(err)=>{
        elem.removeAttribute('disabled' );
        elem.classList.add('bg-main')
        elem.classList.remove('bg-danger');
       // Type ERROR
       this.toastEvokeService.danger('Oppps! ^_^', err.error.message).subscribe();
      }
    })
  }

}
