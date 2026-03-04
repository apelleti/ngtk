import { Injectable, signal, computed } from '@angular/core';

// TODO: persist cart to localStorage so it survives page refresh
@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<{ productId: number; name: string; price: number; qty: number }[]>([]);

  totalItems = computed(() => this.items().reduce((sum, item) => sum + item.qty, 0));
  totalPrice = computed(() => this.items().reduce((sum, item) => sum + item.price * item.qty, 0));

  addItem(productId: number, name: string, price: number) {
    this.items.update(list => {
      const existing = list.find(i => i.productId === productId);
      if (existing) {
        return list.map(i => i.productId === productId ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...list, { productId, name, price, qty: 1 }];
    });
  }

  removeItem(productId: number) {
    this.items.update(list => list.filter(i => i.productId !== productId));
  }

  clearCart() {
    this.items.set([]);
  }

  getItems() {
    return this.items();
  }
}
