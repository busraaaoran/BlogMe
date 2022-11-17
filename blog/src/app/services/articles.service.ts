import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  #url = 'http://localhost:5000/articles';
  constructor(private httpClient: HttpClient) { }

  getArticles(){
    return this.httpClient.get(this.#url);
  }
}
