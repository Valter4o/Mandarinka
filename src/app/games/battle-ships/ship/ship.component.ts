import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {

  @Input() name: string;
  @Input() size:number;
  
  index:number=-1
}
