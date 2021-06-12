import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public productService: ProductService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('EShopStyle | Home');
  }

}
