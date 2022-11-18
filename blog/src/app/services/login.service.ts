import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  #url = 'http://localhost:5000/users';

  constructor() { }
}
