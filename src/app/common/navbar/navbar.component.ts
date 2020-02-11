import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../auth/user/services/iuser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: string;

  constructor(
    public authService: AuthService,
  ) { }

  ngDoCheck(): void  {    
    this.username = localStorage.username;
  }

  logout() {
    this.authService.SignOut()
      .then()
      .catch((err) => {
        //TODO
        alert(err.message)
      })
      ;
  }

}
