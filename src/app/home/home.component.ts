import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  popularWomenProduct$: Observable<Product> = this.productService.get('1eccca2b-da1f-4c92-84e5-c285ec0195f3');
  popularMenProduct$: Observable<Product> = this.productService.get('7b42a7a1-2778-44fa-b197-f59e95b06868');

  currentImageIndex = 0;
  imagePaths = [
    'assets/img/img1.jpg',
    'assets/img/img2.jpg',
    'assets/img/img3.jpg',
    'assets/img/img4.jpg',
  ];

  private timeOut: any;

  constructor(
    public productService: ProductService, 
    private title: Title,
    @Inject(DOCUMENT) private document: Document, 
  ) { }

  ngOnInit(): void {
    this.title.setTitle('EShopStyle | Home');

    this.changeImage();
  }

  changeImage = () => {
    (this.document.getElementById('slide-image') as HTMLImageElement)
      .src = this.imagePaths[this.currentImageIndex];    

    if (this.currentImageIndex < (this.imagePaths.length - 1)) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }

    this.timeOut = setTimeout(this.changeImage, 3000);
  }

  ngOnDestroy() {
    clearTimeout(this.timeOut);
  }
  
}
