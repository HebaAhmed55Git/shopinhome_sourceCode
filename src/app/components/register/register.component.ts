import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Model/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errMessage!:string;
  isLoading:boolean=false;

  // register form variable
  registerForm:FormGroup = new FormGroup({
    name : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Za-z0-9_@]{6}/)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Za-z0-9_@]{6}/)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
  } , this.confirmPassword)


  constructor(private _AuthService:AuthService , private _Router:Router){}
  
  // confirmation password method
  confirmPassword(g:any)
  {
    if( g.get('password')?.value === g.get('rePassword')?.value )
    {
      return null;
    }
    else
    {
      return {'notMatch': true}
    }
  }

  //click on submit button
  registerSubmit( )
  {
    this.isLoading = true;

    if(this.registerForm.valid)
    {
      this._AuthService.registerAPI(this.registerForm.value).subscribe({


        next:(res)=>{ 
          
          this.isLoading = false;
          
          if(  res.message == "success" )
          {
            // progremming Routing
            this._Router.navigate(["/login"])
          }
        
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

}
