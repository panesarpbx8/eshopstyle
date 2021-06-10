import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <div class="links">
        <a href="">Home</a>
        <a href="">Terms of use</a>
        <a href="">Privacy Policy</a>
        <a href="">About</a>
      </div>
      <div class="divider"></div>
      <p>© 2021 EShopStyle, Inc. All rights reserved.</p>
      <p>Developed by <a target="_blank" href="https://panesarpbx8.web.app">Sukhpreet Singh</a></p>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
