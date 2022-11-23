import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;
  numberOfArticles:any;
  deleteInfo:any;
  constructor(private userService:UserService, private confirmService:NgConfirmService, private route:Router) {}

  ngOnInit(){
    //console.log(sessionStorage.getItem('user'));
    let user_ = JSON.parse(sessionStorage.getItem('user')!);
    if(user_){
      this.userService.getUser(user_.user.slug).subscribe(response => {
        //console.log(response);
        this.user = response;
        this.numberOfArticles = this.user.articles.length;
      })
    }

  }

  deleteUser(slug:any){
    this.confirmService.showConfirm("Are you really sure to delete the account?", () => {
      this.userService.deleteUser(slug).subscribe(response => {
        this.deleteInfo = response;
        if(this.deleteInfo.success){
          sessionStorage.clear();
          this.route.navigate(['/all-articles']);
        }
        else{
          alert("Failed to delete user!!");
        }
      })
    },
    () => {
      this.confirmService.closeConfirm();
    })
  }

}
