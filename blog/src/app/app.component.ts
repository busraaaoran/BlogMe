import { Component } from '@angular/core';
import { ArticlesService } from './services/articles.service';
import { CategoriesService } from './services/categories.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
