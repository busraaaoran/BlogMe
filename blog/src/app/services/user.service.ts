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


}
