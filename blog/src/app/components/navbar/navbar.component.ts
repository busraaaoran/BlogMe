import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , OnChanges, DoCheck{

  user:any;
  constructor() { }

  ngOnInit(){
    this.user = JSON.parse(sessionStorage.getItem('user')!);
  }

  ngOnChanges(){
    this.user = JSON.parse(sessionStorage.getItem('user')!);
  }

  ngDoCheck(){
    this.user = JSON.parse(sessionStorage.getItem('user')!);
  }

  logout(){
    sessionStorage.clear();
    this.user = null;
  }
}
