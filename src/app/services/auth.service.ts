import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HotToastService } from '@ngneat/hot-toast';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$: Observable<User>;

  constructor(private ngAuth: AngularFireAuth, private toast: HotToastService) { 
    this.user$ = this.ngAuth.authState.pipe(shareReplay());
  }

  async signUp({ email, password, displayName }): Promise<void> {
    if (!email || !password || !displayName) throw Error('Insufficient information');
    const credential = await this.ngAuth.createUserWithEmailAndPassword(email, password)
    await credential.user.updateProfile({ displayName });
  }
  
  async login({ email, password }): Promise<void> {
    if (!email || !password) throw Error('Invalid credentials');
    await this.ngAuth.signInWithEmailAndPassword(email, password);
    this.toast.success('You are logged in!', { duration: 3000 });
  }

  async googleLogin(): Promise<void> {
    await this.ngAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());  
  }

  async logout(): Promise<void> {
    await this.ngAuth.signOut();
  }
}
