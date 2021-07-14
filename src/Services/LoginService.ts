import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from 'src/Models/LoginCredentials';
import { LoginResponse } from 'src/Models/LoginResponse';
import { ApiRoutesService } from './apiRoutesService';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private apiRoutes: ApiRoutesService) { }

  login(loginCredentials:LoginCredentials){
    return this.http.post<LoginResponse>(this.apiRoutes.login, {id: loginCredentials.id, password: loginCredentials.password});
  }
}
