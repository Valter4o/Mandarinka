import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-notfinished',
  templateUrl: './notfinished.component.html',
  styleUrls: ['./notfinished.component.css']
})
export class NotfinishedComponent  {

  constructor(
    public dialogRef:MatDialogRef<NotfinishedComponent>,
  ) { }

  
}
