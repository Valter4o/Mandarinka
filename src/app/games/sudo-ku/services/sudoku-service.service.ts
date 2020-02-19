import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, DocumentChangeAction } from '@angular/fire/firestore';
import { ICell } from "../interfaces/cell";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SudokuServiceService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  postGame(game: Array<Array<ICell>>, username: string):Promise<DocumentReference> {
    return this.firestore.collection('games').add({ username, game: JSON.stringify(game) });
  }

  getGame():Observable<DocumentChangeAction<ICell>[]>{
    return this.firestore.collection('games').snapshotChanges();
  }
}
