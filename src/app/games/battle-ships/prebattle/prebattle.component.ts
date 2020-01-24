import { Component, OnInit } from '@angular/core';
import { IBox } from '../interfaces/Box';

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

  private ships = {
    tier1: [
      {
        
      }
    ],
    tier2: [

    ],
    tier3: [

    ],
    tier4: [

    ]
  }
}
