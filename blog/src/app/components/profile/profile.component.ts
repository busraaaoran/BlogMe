import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;
  numberOfArticles:any;
  constructor() {

   }

  ngOnInit(){
    console.log(sessionStorage.getItem('user'));
    this.user = JSON.parse(sessionStorage.getItem('user')!);
    this.numberOfArticles = this.user.user.articles.length;
  }

}
