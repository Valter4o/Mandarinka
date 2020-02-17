import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pacman-win',
  templateUrl: './pacman-win.component.html',
  styleUrls: ['./pacman-win.component.css']
})
export class PacmanWinComponent {

  constructor(
    public dialogRef: MatDialogRef<PacmanWinComponent>
  ) { }

  onClose: EventEmitter<any> = new EventEmitter();

  newLevel() {
    this.onClose.emit();
  }
}
