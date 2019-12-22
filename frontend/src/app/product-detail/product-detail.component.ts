import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { Product } from '../../../../models/Product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  private subscriptions: Subscription[];
  private _id: string;
  product: Product;

  set id(id: string) {
    this._id = id;
    this.tryLoad();
  }

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.subscriptions = [
      this.route.params.subscribe(params => {
        this.id = params.id;
      })
    ]
  }

  tryLoad(){
    this.productService.getById(this._id).subscribe(
      data => {
        this.product = data;
      }, _error => {
        this.router.navigate(['/']);
      }
    );
  }

  addToCart() {
    
  }
}
