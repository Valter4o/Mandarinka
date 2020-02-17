import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IPlayerScore } from '../leaderboard/interfaces/PlayerScore';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  saveScore(username): void {
    //Saving player score in local Storage
    this.firestore.collection('leaderboard')
      .valueChanges().subscribe((scoresArr: IPlayerScore[]) => {
        const playerScoreObj = scoresArr.find((obj: IPlayerScore) => obj.username === username);
        localStorage.setItem('playerScore', JSON.stringify(playerScoreObj));
        localStorage.setItem('scores', JSON.stringify(scoresArr));
      })
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

