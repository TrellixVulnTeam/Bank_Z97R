import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AddAccountRequest } from 'src/Contracts/AddAccountRequest';
import { BankAccountService } from 'src/Services/bank-account.service';
import { SessionService } from 'src/Services/session.service';
import { auditTime } from "rxjs/operators";
import { Router } from '@angular/router';
import { BankAccount } from 'src/Models/BankAccount';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.css']
})
export class BankDetailComponent implements OnInit {

  bankAccountForm: FormGroup;
  companyName : string | undefined;
  companyNumber : string | undefined;
  userId = "";
  background = '../assets/Images/Background2.JPG';
  banksName = ["בנק לאומי" , "בנק פועלים" , "בנק דיסקונט" , "אוצר החייל"];

  autoSaveDelay = 10000;

  constructor(private fb: FormBuilder ,private bankAccountService : BankAccountService, private session : SessionService, private router: Router) {  
    this.bankAccountForm = this.fb.group({
      bankDetail: this.fb.array([])});
      this.initializeComponent();


  }

  initializeComponent(){
    this.companyName = this.session.user?.companyName;
    this.companyNumber = this.session.user?.companyNumber;
    if(this.session.user?.id)
      this.userId = this.session.user.id;
  }

  ngOnInit(): void {
    this.fetchBankAccounts();
    this.subscribeAutoSave();
  }
  
  subscribeAutoSave(){
    this.bankAccounts.valueChanges.pipe(auditTime(this.autoSaveDelay))
      .subscribe((formData : BankAccount[]) =>{
        formData.forEach((data, index) => {
          if(data.accountNumber == "")
          {
            formData.splice(index, 1);
          }
        });
          this.bankAccountService.save(this.userId, formData)
          .subscribe(response => {console.log(response)})});
  }

  fetchBankAccounts(){
    this.bankAccountService.getAccounts(this.userId)
    .subscribe((req:AddAccountRequest[]) => {
        if(req == []){
          this.addAccountIntoBankForm();
        }
        req.forEach(a => this.bankAccounts.push(this.fb.group({          
          bankName: a.bankName,
          bankBranch: a.bankBranch,
          accountNumber: a.accountNumber
        })))});
  }

  bankNameChange(event:any, i:number){
    this.bankAccounts.controls[i].get('bankName')?.setValue(event.target.value);
  }

  bankNameSelected(bankName: string, i : number) : boolean{
    return this.bankAccounts.controls[i].get('bankName')?.value === bankName
  }

  createAccountForm(): FormGroup {
    return this.fb.group({
      bankName: 'בנק הפועלים' ,
      bankBranch: '',
      accountNumber: ''
    })
  }
   
  addAccountIntoBankForm() {
    this.bankAccounts.push(this.createAccountForm());
  }
  
  removeAccount(i:number) {
    let accountToRemove: AddAccountRequest  = this.bankAccounts.at(i).value;
    this.bankAccounts.removeAt(i);
    this.bankAccountService.remove(this.userId, accountToRemove.accountNumber).subscribe(res => console.log('good'));
  }
  
  getBankName(i : number) : string{
    console.log(this.bankAccounts.at(i).get('bankName'));
    return this.bankAccounts.at(i).get('bankName')?.value 
  }

  onBackClicked(){
    this.router.navigateByUrl('/personal-detail');
  }

  get bankAccounts() : FormArray {
    return this.bankAccountForm?.get("bankDetail") as FormArray;  
  }
}
