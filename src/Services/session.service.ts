import { JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/Models/User';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public set user(user : User | undefined) {
    if(user){
      sessionStorage.setItem('user-info', JSON.stringify(user));
    }
  }

  public get user() : User | undefined {
      let userJson = sessionStorage.getItem('user-info');
      
      if(userJson)
        return JSON.parse(userJson) as User;

      return undefined;
  }
   
}
