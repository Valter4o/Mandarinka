import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  isLogged: string;

  constructor() {
  }

  ngDoCheck(): void {
    this.isLogged = localStorage.username;
  }

}
