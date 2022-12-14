import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ShowArticlesComponent } from './components/show-articles/show-articles.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path:'all-articles', component: ShowArticlesComponent},
  {path: 'login', component:LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'add-article', component: AddArticleComponent},
  {path: 'article-details/:slug', component: ArticleDetailComponent},
  {path: '', component: HomeComponent},
  {path: 'edit-article/:slug', component: EditArticleComponent},
  {path: 'edit-profile/:slug', component: EditProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
