import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentials } from 'src/Models/LoginCredentials';
import { LoginResponse } from 'src/Models/LoginResponse';
import { LoginService } from 'src/Services/LoginService';
import { SessionService } from 'src/Services/session.service';

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
  
  constructor(private formBuilder : FormBuilder, private service: LoginService, private router: Router, private session: SessionService) { }
  
  get id(){
    return this.loginFormGroup.get('id');
  }

  get password(){
    return this.loginFormGroup.get('password');
  }

  ngOnInit(): void {}

  togglePasswordHidden(): void{
    this.hide = !this.hide;
  }

  login(): void{

    const loginCredentials : LoginCredentials = {
      id: this.id?.value,
      password: this.password?.value,
    };

    this.service.login(loginCredentials).subscribe(response =>{
        if(response.success){
          console.log(response.user);
          this.session._user = response.user;
          this.router.navigateByUrl('/personal-detail');
        }
      }
    , (err : Response) => {
          this.loginFormGroup.setErrors({
            invalidLogin: true
          })
    });
  }

}
