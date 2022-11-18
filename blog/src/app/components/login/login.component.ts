import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(){
    sessionStorage.clear();
  }

  loginData(form: any) {
    console.log(this.loginForm.value);
    this.userService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (v) => {
          this.user = v;
          if (this.user.status == true) {
            sessionStorage.setItem('user', JSON.stringify(this.user));
            this.route.navigate(['profile']);
          } else {
            alert('Please check your inputs!');
          }
        },
        error: (e) => {
          alert('Login failed, Check your login inputs!!');
        },
      });
  }
}
