import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  articleSlug:any;
  article:any;
  category:any;
  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService, private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.articleSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.articleService.getArticleDetails(this.articleSlug).subscribe(response => {
      this.article = response;
      this.categoryService.getCategory(this.article.category_id).subscribe(category => {
      this.category = category;
      });
    });
  }

}
