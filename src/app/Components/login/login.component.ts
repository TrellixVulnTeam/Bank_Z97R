import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentials } from 'src/Models/LoginCredentials';
import { LoginResponse } from 'src/Models/LoginResponse';
import { AuthService } from 'src/Services/auth-service.service';
import { LoginService } from 'src/Services/LoginService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginFormGroup = this.formBuilder.group({
    id: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  url: any;
  imagePath: any;
  loginResponse: LoginResponse | undefined;
  
  constructor(private formBuilder : FormBuilder, private service: LoginService, private router: Router, private authService : AuthService) { 
  }

  ngOnInit(): void {}

  togglePasswordHidden(): void{
    this.hide = !this.hide;
  }

  login(): void{

    this.service.login(this.loginCredentials).subscribe((response : any) =>{
      console.log(response);
      if(response){
          this.authService.setToken(response.token);
          this.router.navigateByUrl('/personal-detail')}
      }
    , (err : Response) => {
      console.log(err);
        if(err.status === 400)
          this.loginFormGroup.setErrors({
            invalidLogin: true
          })
        else{
          this.loginFormGroup.setErrors({
            serverNotAvailable: true
        })}
    });
  }

  get id(){
    return this.loginFormGroup.get('id');
  }

  get password(){
    return this.loginFormGroup.get('password');
  }

  get loginCredentials() : LoginCredentials{
    return {
      id: this.id?.value,
      password: this.password?.value,
    };
  }

}
