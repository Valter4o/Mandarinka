import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-lost-bonus',
  templateUrl: './lost-bonus.component.html',
  styleUrls: ['./lost-bonus.component.css']
})
export class LostBonusComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<LostBonusComponent>
  ) { }

  onClose = new EventEmitter();

  undo() {
    this.onClose.emit('undo');
  }

  refresh() {
    this.onClose.emit('refresh');
  }
}
