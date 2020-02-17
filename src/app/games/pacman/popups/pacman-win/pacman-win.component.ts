import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

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

  newGame() {
    this.onClose.emit();
  }
}
