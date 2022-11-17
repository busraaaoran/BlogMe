import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  #url = 'http://localhost:5000/category';

  constructor(private HttpClient:HttpClient) {
    this.HttpClient.get(this.#url)
   }
}
