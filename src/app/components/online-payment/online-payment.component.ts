import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from 'src/app/Model/services/cart.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';


@Component({
  selector: 'app-online-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './online-payment.component.html',
  styleUrls: ['./online-payment.component.scss']
})
export class OnlinePaymentComponent {

  cartId:string|null=""

  constructor(private _ActivatedRoute:ActivatedRoute,private _CartService:CartService,private toastEvokeService: ToastEvokeService){}

  ngOnInit(): void {
    
    this._ActivatedRoute.params.subscribe(p=>{

      this.cartId = p['id'];
    })
  }

  adressForm : FormGroup = new FormGroup({

    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null),

  })


  // pay btn
  adressFormSubmit()
  {
    this._CartService.onLinePaymentAPI( this.cartId , this.adressForm.value).subscribe({
      next : (res)=>{

        window.location.href = res.session.url;
      
      
      },
      error:(err)=>{
        console.log(err)
        this.toastEvokeService.danger('Oppps! ^_^', err.error.message).subscribe()}
    })


  }

}
