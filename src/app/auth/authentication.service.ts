import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData:Observable<firebase.User>;

  constructor(private angularFireAuth:AngularFireAuth) {
    this.userData=angularFireAuth.authState
   }

   SignUp(email: string, password: string) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });    
  }

  SignIn(email: string, password: string) {
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }

  SignOut() {
    this.angularFireAuth
      .auth
      .signOut();
  }  
}
