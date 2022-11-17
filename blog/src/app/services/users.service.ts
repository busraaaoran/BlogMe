import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  #url = 'http://localhost:5000/users';

  constructor(private httpClient: HttpClient) {

   }
}
