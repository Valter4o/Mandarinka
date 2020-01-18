import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input() errMsg:string;

  constructor(
    public dialogRed:MatDialogRef<any>
  ) { }

  ngOnInit() {
  }

}
