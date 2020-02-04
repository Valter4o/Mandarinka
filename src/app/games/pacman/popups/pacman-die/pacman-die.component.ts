import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pacman-die',
  templateUrl: './pacman-die.component.html',
  styleUrls: ['./pacman-die.component.css']
})
export class PacmanDieComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PacmanDieComponent>
  ) { }

  ngOnInit() {
  }

}
 