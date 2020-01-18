import { Component, OnInit } from '@angular/core';
import { User } from '../../auth/user/services/iuser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  user: User;

  constructor() {
    this.user = JSON.parse(localStorage.user);
  }

  ngOnInit() {
  }

}
