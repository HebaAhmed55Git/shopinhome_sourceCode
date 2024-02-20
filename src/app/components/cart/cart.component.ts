import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartProduct } from 'src/app/Model/interfaces/product';
import { CartService } from 'src/app/Model/services/cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  
   allCartItemsProd!:CartProduct[];

  totalPrice:string = "";
  cartId:string = "";

  dummyCount!:string

  constructor(private _CartService:CartService,private toastEvokeService: ToastEvokeService){}

  // start
  ngOnInit(): void {


    this._CartService.getAllCartAPI().subscribe({
      next : (res)=>{
        
       this.allCartItemsProd =  res.data.products;

      this.totalPrice =  res.data.totalCartPrice;
      this.cartId =  res.data._id;

      
      },
      error:(err)=>this.toastEvokeService.danger('Oppps! ^_^', err.error.message).subscribe()
    })


    
    localStorage.setItem("currentPage" , "/cart");


    
  }


  // delete button
  deleteItemBtn(pId:string|null|undefined)
  {
    
    this._CartService.removeCartItemAPI(pId).subscribe({
      next : (res)=>{
        
        this.totalPrice = res.data.totalCartPrice;
        this.allCartItemsProd =  res.data.products;
       this._CartService.numOfCartItems.next(res.numOfCartItems) ;
       this.toastEvokeService.success('Successfully!', 'Product Deleted Successfully').subscribe();
      
      
      },
      error:(err)=>this.toastEvokeService.danger('Oppps! ^_^', err.error.message).subscribe()
    })
  }


  // plus
  updateCartBtn(pID:string|null|undefined , pCount:string, whichBtn:string)
  {

    if( whichBtn == 'plus' )
    {
        this.dummyCount = (Number(pCount) + 1).toString();
    }
    else
    {
      if(Number(pCount) <= 1)
      {
        this.deleteItemBtn(pID);
      } 
      else
      {
        this.dummyCount = (Number(pCount) - 1).toString();
  
      }
    }

     this._CartService.updateCartItemsAPI(pID , this.dummyCount).subscribe({
      next : (res)=>{
        console.log(res)
        this.totalPrice = res.data.totalCartPrice;
        this.allCartItemsProd =  res.data.products;
        this.toastEvokeService.success('Successfully!', 'Product Quentity Updated Successfully').subscribe();
      },
      error:(err)=>this.toastEvokeService.danger('Oppps! ^_^', err.error.message).subscribe()
     })
  }
  

  clearCartBtn()
  {
    this._CartService.clearUserCartAPI().subscribe({
      next:(res)=>{

        this.allCartItemsProd = [];
        this.totalPrice = "0";

        this._CartService.numOfCartItems.next(0);
        this.toastEvokeService.success('Successfully!', 'your Cart is empty now').subscribe();

      },
      error:(err)=>this.toastEvokeService.danger('Oppps! ^_^', err.error.message).subscribe()
    })
  }

}
