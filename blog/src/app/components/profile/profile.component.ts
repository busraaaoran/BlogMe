import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;
  numberOfArticles:any;
  constructor(private userService:UserService) {}

  ngOnInit(){
    console.log(sessionStorage.getItem('user'));
    let user_ = JSON.parse(sessionStorage.getItem('user')!);
    if(user_){
      this.userService.getUser(user_.user.slug).subscribe(response => {
        console.log(response);
        this.user = response;
        this.numberOfArticles = this.user.articles.length;
      })
    }

  }

}
