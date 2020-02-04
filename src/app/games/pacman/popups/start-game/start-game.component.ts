import { Component, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent {

  constructor(
    public dialogRef: MatDialogRef<StartGameComponent>,
  ) { }

  onClose:EventEmitter<any> = new EventEmitter();

  close(){
    this.onClose.emit();
  }

}
