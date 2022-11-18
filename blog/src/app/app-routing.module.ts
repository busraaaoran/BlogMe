import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ShowArticlesComponent } from './components/show-articles/show-articles.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path:'all-articles', component: ShowArticlesComponent},
  {path: 'login', component:LoginComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
