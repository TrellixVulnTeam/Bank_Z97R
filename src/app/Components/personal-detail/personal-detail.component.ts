import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { updatePersonalDetailsRequest } from 'src/Contracts/updatePersonalDetailsRequest';
import { PersonalDetailService } from 'src/Services/personal-detail.service';
import { SessionService } from 'src/Services/session.service';
import jwtDecode from 'jwt-decode';
import { User } from 'src/Models/User';
import { AuthService } from 'src/Services/auth-service.service';

@Component({
  selector: 'app-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.css']
})
export class PersonalDetailComponent implements OnInit {

  background = '../assets/Images/Background1.jpg';
  personalDetailsForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    familyName: ['', Validators.required ],
    id: ['', Validators.required ],
    companyName: ['', [Validators.required]],
    companyNumber: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['']
  });

  constructor(private formBuilder : FormBuilder, private session:SessionService, private router:Router, private personalDetailsService: PersonalDetailService, private authService: AuthService) { }

  ngOnInit(): void {
    if(!this.session.user)
      this.fetchUserInfo();
    if(this.session.user)
       this.initializeComponent(this.session.user);
  }

  initializeComponent(user: User){
    this.firstName?.setValue(user.firstName);
    this.familyName?.setValue(user.familyName);
    this.id?.setValue(user.id);
    this.birthday?.setValue(user.birthday);
    this.phoneNumber?.setValue(user.phoneNumber);
    this.email?.setValue(user.email);
    this.companyName?.setValue(user.companyName);
    this.companyNumber?.setValue(user.companyNumber);
  }

  fetchUserInfo() : void{
    // fetch information form api server 
      const token = this.authService.getToken();
    
      if(token){
        const decodedJwt: any = jwtDecode(token);
        const userId = decodedJwt.id;
  
        this.personalDetailsService.getUserById(userId).subscribe(res => {
          if(res){
            console.log(res);
            this.session.user = res;
            this.initializeComponent(res);
          }
          
        }, err =>{console.log(err)});
      } 
  }

  onSubmit(){

    let request: updatePersonalDetailsRequest = this.personalDetailsForm.value;

    if(this.personalDetailsForm.valid){
      this.personalDetailsService.update(request).subscribe(res =>{
        console.log(res);
        this.updateSession();
        this.router.navigateByUrl('/bank-detail');
      }, err => {
        if(err.status === 400)
          this.personalDetailsForm.setErrors({
            IncorrectValues: true
          });
        else{
          this.personalDetailsForm.setErrors({
            serverNotAvailable: true
          });
        }
      });     
    }else{
      this.personalDetailsForm.setErrors({
        invalidForm: true
      });
    }
  }

  updateSession(){
    this.session.user = {
      firstName: this.firstName?.value,
      familyName: this.familyName?.value,
      id: this.id?.value,
      birthday: this.birthday?.value, 
      phoneNumber: this.phoneNumber?.value,      
      email: this.email?.value,
      companyName: this.companyName?.value,
      companyNumber: this.companyNumber?.value
    };
  }
  
  get firstName() : AbstractControl | null {
    return this.personalDetailsForm?.get('firstName');
  }
  get familyName() : AbstractControl | null {
    return this.personalDetailsForm?.get('familyName');
  }
  get id() : AbstractControl | null{
    return this.personalDetailsForm?.get('id');
  }
  get birthday() : AbstractControl | null {
    return this.personalDetailsForm?.get('birthday');
  }
  get phoneNumber() : AbstractControl | null {
    return this.personalDetailsForm?.get('phoneNumber');
  }
  get email() : AbstractControl | null{
    return this.personalDetailsForm?.get('email');
  }
  get companyName() : AbstractControl | null{
    return this.personalDetailsForm?.get('companyName');
  }
  get companyNumber() : AbstractControl | null{
    return this.personalDetailsForm?.get('companyNumber');
  }
}
