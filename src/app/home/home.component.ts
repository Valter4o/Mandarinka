import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../auth/authentication.service";
import { Router } from "@angular/router";
import { User } from '../auth/user/services/iuser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
  ) {
    this.user = JSON.parse(localStorage.user);
  }

  ngOnInit() {
  }

}