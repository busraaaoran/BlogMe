import { Component } from '@angular/core';
import { ArticlesService } from './services/articles.service';
import { CategoriesService } from './services/categories.service';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog';
  user:any;
  articles:any;
  categories:any;

  constructor(private article_service: ArticlesService, private category_service:CategoriesService){}

  ngOnInit(){
    console.log(sessionStorage.getItem("user"))
    this.article_service.getArticles()
    .subscribe(response => {
      this.articles = response;
    });

    this.category_service.getCategories()
    .subscribe(response => {
      this.categories = response;
    })
    this.user = JSON.parse(sessionStorage.getItem('user')!);

  }
  ngOnChanges(){
    this.user = JSON.parse(sessionStorage.getItem('user')!);
  }

  logout(){
    sessionStorage.clear();
  }

}
