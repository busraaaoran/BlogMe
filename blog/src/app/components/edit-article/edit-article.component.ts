import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { ArticlesService } from 'src/app/services/articles.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
})
export class EditArticleComponent implements OnInit {
  editArticleForm!: FormGroup;
  categories: any;
  user = JSON.parse(sessionStorage.getItem('user')!);
  article: any;

  articleSlug: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private formBuilder: FormBuilder,
    private route: Router,
    private category_service: CategoriesService
  ) {}

  ngOnInit(): void {
    this.articleSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.articleService
      .getArticleDetails(this.articleSlug)
      .subscribe((response) => {
        this.article = response;
        this.editArticleForm.patchValue(response);
      });

    this.category_service.getCategories().subscribe((response) => {
      this.categories = response;
    });

    this.editArticleForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.maxLength(255)],
      content: ['', Validators.required],
    });
  }

  editArticleData(form: any) {
    this.articleService.updateArticle(
      this.articleSlug,
      this.editArticleForm.value.title,
      this.editArticleForm.value.category,
      this.editArticleForm.value.image,
      this.editArticleForm.value.content
    ).subscribe({
      next: (v) => {
        this.route.navigate(['profile']);
      },
      error: (e) => {
        alert('Editing article failed, Check your input data!!');
      },
    })
  }
}
