import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddAccountRequest } from 'src/Contracts/AddAccountRequest';
import { ApiRoutesService } from './apiRoutesService';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private http: HttpClient, private apiRoutes: ApiRoutesService) { }

  getAccounts(userId : string) : Observable<AddAccountRequest[]>{
    return this.http.get<AddAccountRequest[]>(this.apiRoutes.getBankAccounts(userId));
  }

  remove(userId: string, accountNumber: string){
    return this.http.delete(this.apiRoutes.deleteBankAccount(userId, accountNumber));
  }

  save(userId: string, accountToAdd: AddAccountRequest[]){
    console.log('Account to add ', JSON.stringify(accountToAdd));
    return this.http.post(this.apiRoutes.addBankAccount(userId), accountToAdd);
  }
}
