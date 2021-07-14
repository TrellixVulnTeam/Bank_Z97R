import { Injectable } from '@angular/core';
import { User } from 'src/Models/User';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  _user: User | undefined;
  
  public set user(user : User | undefined) {
    this._user = user;
  }

  public get user() : User | undefined{
    return this._user;
  }
   
}
