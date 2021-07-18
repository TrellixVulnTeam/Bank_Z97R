import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { updatePersonalDetailsRequest } from 'src/Contracts/updatePersonalDetailsRequest';
import { User } from 'src/Models/User';
import { ApiRoutesService } from './apiRoutesService';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailService {

  constructor(private http: HttpClient, private apiRoute: ApiRoutesService) { }

  public getUserById(userId: string){
    return this.http.get<User>(this.apiRoute.getUserById(userId));
  }

  public update(userInfo: updatePersonalDetailsRequest){
      return this.http.put(this.apiRoute.updatePersonalDetail(userInfo.id), userInfo);
  }
}
