import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/Model/services/products.service';
import {Product} from '../../Model/interfaces/product'
import { RouterLink } from '@angular/router';
import { SubtitlePipe } from 'src/app/Model/pipe/subtitle.pipe';
import { CartService } from 'src/app/Model/services/cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink,SubtitlePipe,NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  pageSize:number=0;
  currentPage:number=0;
  totalItems:number=0;

  allProducts:Product[]=[];

  constructor(private _ProductsService:ProductsService,private _CartService:CartService,private toastEvokeService: ToastEvokeService){}

  ngOnInit(): void {
    
    this._ProductsService.getProductsAPI().subscribe({

      next : (res)=>{

       this.allProducts =  res.data;
       this.pageSize = res.metadata.limit;
       this.currentPage = res.metadata.currentPage;
       this.totalItems = res.results;

      },
      error :(err)=>{console.log(err)}
    })
    
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

  // 
  pageChanged(NumberClicked:any):void
  {
    this._ProductsService.getProductsAPI(NumberClicked).subscribe({

      next : (res)=>{

       this.allProducts =  res.data;
       this.pageSize = res.metadata.limit;
       this.currentPage = res.metadata.currentPage;
       this.totalItems = res.results;

      },
      error :(err)=>{console.log(err)}
    })
  }

}
