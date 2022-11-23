import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit {
  articleSlug: any;
  article: any;
  category: any;
  user: any;
  deleteInfo: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private route: Router,
    private confirmService: NgConfirmService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user')!);
    this.articleSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.articleService
      .getArticleDetails(this.articleSlug)
      .subscribe((response) => {
        this.article = response;
        this.categoryService
          .getCategory(this.article.category_id)
          .subscribe((category) => {
            this.category = category;
          });
      });
  }

  deleteArticle(slug: any) {

    this.confirmService.showConfirm("Are you sure to delete the article?",
    () => {
      this.articleService.deleteArticle(slug).subscribe((response) => {
        this.deleteInfo = response;
        if (this.deleteInfo.success) {
          this.route.navigate(['/profile']);
        }
        else{
          alert("Failed to delete the article!");
        }
      });
    },
    () => {
      this.confirmService.closeConfirm();
    })

  }
}
