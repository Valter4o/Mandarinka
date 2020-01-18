import { Injectable } from '@angular/core';
import { ICell } from "../sudo-ku/interfaces/cell";

@Injectable({
  providedIn: 'root'
})
export class SudokuServiceService {

  constructor(
    gamesRef:AngularFire
  ) { }
}
