import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IBox } from '../interfaces/Box';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-prebattle',
  templateUrl: './prebattle.component.html',
  styleUrls: ['./prebattle.component.css']
})


export class PrebattleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private board: Array<Array<IBox>> = [
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  ]

  @ViewChild('cdkBoard', { read: ElementRef, static: false }) boardElement
  public index: number = -1;
  public ships = [
    { name: "Submarin", size: 1 },
    { name: "frigate", size: 2 },
    { name: "destroyer", size: 3 },
    { name: "cruiser", size: 4 }
  ];

  public shipsInBoard: any[] = [];

  position: any
  
  drop(event: CdkDragDrop<string[]>) {
    // event.previousContainer.data[event.previousIndex].top = this.position ? this.position.y - this.boardElement.nativeElement.getBoundingClientRect().y : 0
    // event.previousContainer.data[event.previousIndex].left = this.position ? this.position.x - this.boardElement.nativeElement.getBoundingClientRect().x : 0
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
