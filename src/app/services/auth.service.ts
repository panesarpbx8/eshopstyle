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
    try {
      if (this.userExists(email)) throw Error('User already exists');
      const credential = await this.ngAuth.createUserWithEmailAndPassword(email, password)
      await credential.user.updateProfile({ displayName });
      this.toast.success('Account created!');
    } catch (e) {
      this.toast.error(e.message);
    }
  }
  
  async login({ email, password }): Promise<void> {
    try {
      if (!email || !password) throw Error('Invalid credentials');
      await this.ngAuth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      this.toast.error(e.message);
    }
  }

  async googleLogin(): Promise<void> {
    try {
      await this.ngAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());  
    } catch (e) {
      this.toast.error(e.message);
    }
  }

  async logout(): Promise<void> {
    await this.ngAuth.signOut();
    this.toast.success('You have been logged out!');
  }

  private async userExists(email: string): Promise<boolean> {
    const methods = await this.ngAuth.fetchSignInMethodsForEmail(email);
    return methods.length > 0;
  }
}
