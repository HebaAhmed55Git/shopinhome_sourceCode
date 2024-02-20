import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Model/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isLoading:boolean = false;
  errMessage!:string;


  loginForm:FormGroup = new FormGroup({

    email : new FormControl(null , [Validators.required , Validators.email ] ),
     password : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Za-z0-9_@]{6}/) ])
 
    })

  constructor(private _AuthService:AuthService , private _Router:Router){}

  //login btn
  loginSubmit( )
  {
    this.isLoading = true;
    
   if( this.loginForm.valid )
   {
    
    this._AuthService.loginAPI(this.loginForm.value).subscribe({


      next:(res)=>{ 
        
        console.log("insideLoginNext")
        this.isLoading = false;

        localStorage.setItem("userToken" , res.token);

        this._AuthService.saveDataMethod();

        this._Router.navigate(['/home'])
      
      },

      error:(err)=>
      {  
        console.log("Error")
        this.isLoading = false;
        console.log(err);
        this.errMessage = err.error.message
       
      
      },

    })
   }


  }

}
