import { Injectable } from "@angular/core";

@Injectable()
export class ApiRoutesService{
    
    private baseUrl = 'https://localhost:44332/api/v1';

    get login(): string{
        return this.baseUrl + '/identity/login';
    }

    getUserById(userId : string) : string{
        return this.baseUrl + '/user/'+ userId;
    }

    updatePersonalDetail(userId: string) : string{
        return this.baseUrl + '/user/'+ userId;
    }

    getBankAccounts(userId: string){
        return this.baseUrl + '/bankAccount/'+ userId;
    }

    deleteBankAccount(userId: string, accountNumber: string){
        return this.baseUrl + '/bankAccount/'+ userId + '/' + accountNumber;
    }

    addBankAccount(userId: string){
        return this.baseUrl + '/bankAccount/'+ userId;
    }
}