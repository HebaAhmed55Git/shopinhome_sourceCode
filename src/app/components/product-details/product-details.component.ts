import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Model/services/products.service';
import { Product } from 'src/app/Model/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Model/services/cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
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
  pId:string = "";

  specProduct !: Product;
  productImages!:string[];

  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductsService:ProductsService,private _CartService:CartService,private toastEvokeService: ToastEvokeService){}

  ngOnInit(): void {

    this._ActivatedRoute.params.subscribe( (par)=>{

      this.pId = par['id'];

      this._ProductsService.getSpecProdAPI(this.pId).subscribe({

        next : (res)=>{

          this.specProduct = res.data;
          this.productImages = res.data.images;

          console.log(this.productImages)
          
        },
        error : (err)=>{console.log(err)}
      })
      

    } )
    
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
