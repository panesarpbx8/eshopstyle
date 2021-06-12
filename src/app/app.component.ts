import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showCookies: boolean = true;

  ngOnInit() {
    if (!sessionStorage['cookie']) {
      sessionStorage['cookie'] = JSON.stringify({ show: true });
    }
    const cookie = JSON.parse(sessionStorage['cookie']);
    
    if (cookie.show) {
      this.showCookies = true;
    } else {
      this.showCookies = false;
    }
  }
  
  accepted() {
    sessionStorage['cookie'] = JSON.stringify({ show: false });
    this.showCookies = false;
  }
}
