import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  productId = signal<string | null>(null);
  quantity = signal(1);

  constructor(private route: ActivatedRoute) {
    this.productId.set(this.route.snapshot.paramMap.get('id'));
  }

  // TODO: fetch product details from ProductService instead of hardcoding
  addToCart() {
    console.log(`Added ${this.quantity()} items to cart`);
  }

  updateQuantity(delta: number) {
    this.quantity.update(q => Math.max(1, q + delta));
  }
}
