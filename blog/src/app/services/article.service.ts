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

  updateArticle(slug:any, title:any, category_id:any, image:any, content:any){
    return this.httpClient.put(this.#url+slug, {title, category_id, image, content});
  }

  deleteArticle(slug:any){
    return this.httpClient.delete(this.#url+slug);
  }

}
