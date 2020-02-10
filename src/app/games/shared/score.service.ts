import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IPlayerScore } from '../../leaderboard/interfaces/PlayerScore';
import { map, shareReplay } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private cache$: Observable<Array<IPlayerScore>>

  constructor(
    private firestore: AngularFirestore
  ) { }

  get score(): Observable<any> {
    if (!this.cache$) {
      this.cache$ = this.requestScore().pipe(
        shareReplay(1)
      )
    }
    return this.cache$;
  }

  requestScore(): Observable<any> {
    return this.firestore.collection('leaderboard')
      .snapshotChanges()
      .pipe(
        map(arr => arr.map((el) => el.payload.doc.data())),
      )
  }

  getUserScore(username, game): Observable<number> {
    return this.firestore.collection('leaderboard')
      .valueChanges()
      .pipe(
        map(arr => arr.find((el: IPlayerScore) => el.username === username)[game])
      )
  }

  createUser(username, uid) {
    const userScoreData: IPlayerScore = {
      username,
      sudoku: 0,
      pacman: 0,
      tetris: 0,
      bonus: 0,
    }
    this.firestore.doc(`leaderboard/${uid}`)
      .snapshotChanges()
      .subscribe((data) => {
        if (!data.payload.data()) {
          this.firestore.doc(`leaderboard/${uid}`).set(userScoreData);
        }
      });
  }

  updateScore(uid, game, score) {
    if (game === 'bonus') {
      this.firestore.collection('leaderboard').doc(`${uid}`).set({ bonus: score }, { merge: true });
    } else if (game === 'pacman') {
      this.firestore.collection('leaderboard').doc(`${uid}`).set({ pacman: score }, { merge: true });
    } else if (game === 'sudoku') {
      this.firestore.collection('leaderboard').doc(`${uid}`).set({ sudoku: score }, { merge: true });
    } else if (game === 'tetris') {
      this.firestore.collection('leaderboard').doc(`${uid}`).set({ tetris: score }, { merge: true });
    }
  }
}

