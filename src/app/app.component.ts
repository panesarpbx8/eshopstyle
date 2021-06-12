import { Component, OnInit } from '@angular/core';

interface Cookie {
  show: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showCookies: boolean = true;

  ngOnInit() {
    const cookie: Cookie = JSON.parse(sessionStorage['cookie']);

    if (!cookie) {
      sessionStorage['cookie'] = JSON.stringify({ show: true });
    } else {
      if (cookie.show) {
        this.showCookies = true;
      } else {
        this.showCookies = false;
      }
    }
  }
  
  accepted() {
    sessionStorage['cookie'] = JSON.stringify({ show: false });
    this.showCookies = false;
  }
}
