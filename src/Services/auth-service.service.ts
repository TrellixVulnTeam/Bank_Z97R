import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken() : string | null{
    const token = localStorage.getItem('token');
    return token;
  }

  setToken(token : string) : void{

  }
}
