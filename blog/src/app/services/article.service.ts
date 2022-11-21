import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  #url = 'http://localhost:5000/article/'
  constructor(private httpClient:HttpClient) { }

  getArticleDetails(slug:any){
    return this.httpClient.get(this.#url+slug);
  }


}
