import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  #url = 'http://localhost:5000/user/';

  constructor(private httpClient: HttpClient) { }

  login(username:any,password:any){
    return this.httpClient.post(this.#url+"login", {username, password});
  }

  getUser(slug:any){
    return this.httpClient.get(this.#url+slug);
  }

  updateUser(slug:any, first_name:any, last_name:any, phone:any, profile_picture:any){
    return this.httpClient.put(this.#url+slug, {first_name, last_name, phone, profile_picture});
  }

  deleteUser(slug:any){
    return this.httpClient.delete(this.#url+slug);
  }

}
