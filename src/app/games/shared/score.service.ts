import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IPlayerScore } from '../../leaderboard/interfaces/PlayerScore';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  leaderboard: IPlayerScore[] = [];

  constructor(
    private firestore: AngularFirestore
  ) { }

  getScores() {
    this.firestore.collection('leaderboard')
      .snapshotChanges()
      .subscribe((data) => {
        for (let el of data) {
          this.leaderboard.push(el.payload.doc.data() as IPlayerScore);
        }

        localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
      });
  }

  getUserScore(username, game) {
    const leaderboard = JSON.parse(localStorage.leaderboard);
    return leaderboard.find((el) => el.username === username)[game];
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
    }else if (game === 'pacman') {
      this.firestore.collection('leaderboard').doc(`${uid}`).set({ pacman: score }, { merge: true });
    }else if (game === 'sudoku') {
      this.firestore.collection('leaderboard').doc(`${uid}`).set({ sudoku: score }, { merge: true });
    }else if (game === 'tetris') {
      this.firestore.collection('leaderboard').doc(`${uid}`).set({ tetris: score }, { merge: true });
    }
  }
}

