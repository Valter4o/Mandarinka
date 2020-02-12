import { Injectable, NgZone } from '@angular/core';
import { User } from "./interfaces/iuser";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { ScoreService } from '../games/shared/score.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: firebase.User; // Save logged in user data

  constructor(
    public score: ScoreService,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
      } else {
        this.userData = null;
      }
    })
  }

  getUserData() {
    return this.afAuth.authState
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        const uid = result.user.uid;
        this.afs.doc(`usernames/${uid}`).snapshotChanges().subscribe(data => {
          const username = (data.payload.data() as any).username;
          localStorage.setItem('username', username);
          this.score.createUser(username, uid);
          // this.score.getScores();
        })
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password, username) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUsername(username, result.user.uid);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SetUsername(username, uid) {
    this.afs.doc(`usernames/${uid}`).set({ username });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = this.userData;
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        })
        this.SetUserData(result.user);
        this.afs.doc(`usernames/${result.user.uid}`).snapshotChanges().subscribe(data => {
          const username = (data.payload.data() as any).username;
          localStorage.setItem('username', username);
          this.score.createUser(username, result.user.uid);
          // this.score.getScores();
        })
      }).catch((error) => {
        window.alert(error)
      })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    }
    return userRef.set(userData, {
      merge: true
    }).then(() => {
      this.score.createUser(userData.username, userData.uid);
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.userData = null;
      localStorage.clear();
      this.router.navigate(['home']);
    })
  }

}