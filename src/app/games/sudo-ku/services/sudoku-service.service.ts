import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICell } from "../interfaces/cell";

@Injectable({
  providedIn: 'root'
})
export class SudokuServiceService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  postGame(game: Array<Array<ICell>>, username: string) {
    return this.firestore.collection('games').add({ username, game: JSON.stringify(game) });
  }

  getGame(){
    return this.firestore.collection('games').snapshotChanges();
  }
}
