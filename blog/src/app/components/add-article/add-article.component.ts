import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular/module/flash-messages.service';
import { ArticlesService } from 'src/app/services/articles.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  articleForm: FormGroup;
  categories: any;
  user = JSON.parse(sessionStorage.getItem('user')!);
  response:any;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private category_service: CategoriesService,
    private articles_service: ArticlesService
  ) {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      category_id: ['', Validators.required],
      image: ['', Validators.maxLength(255)],
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.category_service.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  articleData(form: any) {
    console.log(this.articleForm.value);
    this.articles_service.addArticle(
      this.articleForm.value.title,
      this.user.user.id,
      this.articleForm.value.category_id,
      this.articleForm.value.image,
      this.articleForm.value.content
    ).subscribe({
      next: (v) => {
        this.response = v;
        if (this.response.id){
          this.route.navigate(['profile']);
        }
        else{
          alert("Cannot add article, check your input data!");
        }
      },
      error: (e) => {
        alert('Login failed, Check your login inputs!!');
      },
    });
  }
}
