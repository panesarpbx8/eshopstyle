import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  state: 'login' | 'sign-up' = 'login';

  displayName: string;
  email: string;
  password: string;

  error: string;

  constructor(public auth: AuthService,) { }

  ngOnInit(): void {
  }

  change(to: 'login' | 'sign-up') {
    this.state = to;
  }

  async login() {
    try {
      await this.auth.login({ email: this.email, password: this.password });
      
    } catch (e) {
      this.error = e.message;
    }
  }

  async signUp() {
    try {
      await this.auth.signUp({ email: this.email, password: this.password, displayName: this.displayName });
      
    } catch (e) {
      this.error = e.message;
    }
  }

  async googleLogin() {
    try {
      await this.auth.googleLogin();

    } catch (e) {
      
      this.error = e.message;
    }
  }

}
