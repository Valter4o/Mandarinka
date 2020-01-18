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

  constructor(
    public authService: AuthService,
    public router: Router,
  ) {
    this.user = JSON.parse(localStorage.user);
  }

  ngOnInit() {
  }

  logout() {
    this.authService.SignOut().then((res) => {
      this.router.navigate(['home']);
      location.reload();
    }).catch((err) => {
      //TODO
      alert(err.message)
    })
      ;
  }

}
