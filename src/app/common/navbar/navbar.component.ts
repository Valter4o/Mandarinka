import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../auth/user/services/iuser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  username: string;

  constructor(
    public authService: AuthService,
    public router: Router,
  ) { }

  ngDoCheck(): void {
    this.user = JSON.parse(localStorage.user);
    this.username = localStorage.username;
  }
  
  ngOnInit() {
  }

  logout() {
    this.authService.SignOut().then(() => {
      this.router.navigate(['home']);
    }).catch((err) => {
      //TODO
      alert(err.message)
    })
      ;
  }

}
