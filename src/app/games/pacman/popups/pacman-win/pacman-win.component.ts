import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-pacman-win',
  templateUrl: './pacman-win.component.html',
  styleUrls: ['./pacman-win.component.css']
})
export class PacmanWinComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PacmanWinComponent>
  ) { }

  ngOnInit() {
  }

}
