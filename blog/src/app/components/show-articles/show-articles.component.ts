import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-show-articles',
  templateUrl: './show-articles.component.html',
  styleUrls: ['./show-articles.component.css']
})
export class ShowArticlesComponent implements OnInit {

  title = 'blog';

  articles:any;
  categories:any;

  constructor(private article_service: ArticlesService, private category_service:CategoriesService){}

  ngOnInit(){
    this.article_service.getArticles()
    .subscribe(response => {
      this.articles = response;
    });

    this.category_service.getCategories()
    .subscribe(response => {
      this.categories = response;
    })
  }
}
