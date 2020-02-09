import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  userLogged: string;

  constructor() { }

  ngDoCheck() {
    this.userLogged = localStorage.username;
  }
}