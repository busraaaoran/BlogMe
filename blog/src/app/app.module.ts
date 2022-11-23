import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { ShowArticlesComponent } from './components/show-articles/show-articles.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { NgConfirmModule } from 'ng-confirm-box';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AddArticleComponent,
    ShowArticlesComponent,
    AddCategoryComponent,
    ProfileComponent,
    ArticleDetailComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    EditArticleComponent,
    EditProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgConfirmModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
