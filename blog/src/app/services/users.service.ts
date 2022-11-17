import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  #url = 'http://localhost:5000/users';

  constructor(private httpClient: HttpClient) { }

  addUser(first_name:any, last_name:any, username:any, email:any, phone:any, password:any){
    return this.httpClient.post<User>(this.#url,{first_name, last_name, username, email, phone, password})
    .pipe(map((User:any) => {
      return User;
    }))
  }
}
