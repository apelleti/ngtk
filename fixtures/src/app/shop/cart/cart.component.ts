import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// HACK: cart state lives in component instead of a global store — migrate to NgRx
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  items = signal<{ name: string; price: number; qty: number }[]>([
    { name: 'Wireless Headphones', price: 79.99, qty: 1 },
    { name: 'Running Shoes', price: 129.99, qty: 2 },
  ]);

  total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  removeItem(index: number) {
    this.items.update(list => list.filter((_, i) => i !== index));
  }
}
