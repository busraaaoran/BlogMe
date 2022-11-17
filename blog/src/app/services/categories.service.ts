import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  #url = 'http://localhost:5000/categories';
  constructor(private HttpClient:HttpClient) { }


  getCategories(){
    return this.HttpClient.get(this.#url);
  }
}
