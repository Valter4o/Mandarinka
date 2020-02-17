import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pacman-die',
  templateUrl: './pacman-die.component.html',
  styleUrls: ['./pacman-die.component.css']
})
export class PacmanDieComponent {

  constructor(
    public dialogRef: MatDialogRef<PacmanDieComponent>
  ) { }

  onClose: EventEmitter<any> = new EventEmitter();
  
  newGame() {
    this.onClose.emit();
  }
} 
