import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Model/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  isLoading:boolean = false;
  errMessage:string="";
  forgetFlag : boolean = true;
  verifyFlag : boolean = false;
  newPassFlag : boolean = false;

  forgetForm : FormGroup = new FormGroup({

    email : new FormControl(null , [Validators.required , Validators.email ] ),
  })

  
  verifyForm : FormGroup = new FormGroup({

    resetCode : new FormControl(null , [Validators.required ] ),
  })

  newPassForm : FormGroup = new FormGroup({

    email : new FormControl(null , [Validators.required , Validators.email ] ),
    newPassword : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z].{6}/) ]),
    })

    constructor(private _AuthService:AuthService , private _Router:Router){}

    //forget
  forgetSubmit( )
  {
    this.isLoading = true


    this._AuthService.forgetAPI(this.forgetForm.value).subscribe({


      next:(res)=>{ 
        
        this.isLoading = false;

       this.forgetFlag = false;
       this.verifyFlag = true;
      
      },

      error : (err)=>
      {  
        this.isLoading = false;
        console.log(err)
        this.errMessage=  err.error.message;
      
      },

    })


  }

  //verify
  verifySubmit( )
  {
    this.isLoading = true


    this._AuthService.verifyAPI(this.verifyForm.value).subscribe({


      next:(res)=>{ 
        
        this.isLoading = false;
       
        this.verifyFlag = false;
       this.newPassFlag = true;
      
      },

      error : (err)=>
      {  
        this.isLoading = false;
        console.log(err)
        this.errMessage=  err.error.message;
      
      },

    })


  }

  //new form
 newPassSubmit( )
 {
   this.isLoading = true


   this._AuthService.newPassAPI(this.newPassForm.value).subscribe({


     next:(res)=>{ 
       
       this.isLoading = false;
       
      //  localStorage.setItem("userToken" , res.token);
      //  this._AuthService.saveDataMethod() ; 

      this._Router.navigate(["/login"])

     
     },

     error : (err)=>
     {  
       this.isLoading = false;
       console.log(err)
       this.errMessage=  err.error.message;
     
     },

   })


 }

}
