import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { updatePersonalDetailsRequest } from 'src/Contracts/updatePersonalDetailsRequest';
import { PersonalDetailService } from 'src/Services/personal-detail.service';
import { SessionService } from 'src/Services/session.service';

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

  constructor(private formBuilder : FormBuilder, private session:SessionService, private router:Router, private personalDetailsService: PersonalDetailService) { }

  ngOnInit(): void {
    this.firstName?.setValue(this.session._user?.firstName);
    this.familyName?.setValue(this.session._user?.familyName);
    this.id?.setValue(this.session._user?.id);
    this.birthday?.setValue(this.session._user?.birthday);
    this.phoneNumber?.setValue(this.session._user?.phoneNumber);
    this.email?.setValue(this.session._user?.email);
    this.companyName?.setValue(this.session._user?.companyName);
    this.companyNumber?.setValue(this.session._user?.companyNumber);

  }

  
  onSubmit(){

    let request: updatePersonalDetailsRequest = this.personalDetailsForm.value;
    console.log(this.companyNumber?.value);

    if(this.personalDetailsForm.valid){
      this.personalDetailsService.update(request).subscribe(res =>{
        this.updateSession();
        this.router.navigateByUrl('/bank-detail');
      }, err => {
        this.personalDetailsForm.setErrors({
          invalidForm: true
        });
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
