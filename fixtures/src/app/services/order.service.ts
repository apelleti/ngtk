import { Injectable } from '@angular/core';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: { name: string; qty: number; price: number }[];
}

// TODO: add WebSocket support for real-time order status updates
@Injectable({ providedIn: 'root' })
export class OrderService {
  // HACK: using in-memory array instead of API — this resets on page reload
  private orders: Order[] = [];

  placeOrder(items: { name: string; qty: number; price: number }[]): Order {
    const order: Order = {
      id: `ORD-${String(this.orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      total: items.reduce((sum, i) => sum + i.price * i.qty, 0),
      status: 'processing',
      items,
    };
    this.orders.push(order);
    return order;
  }

  getHistory(): Order[] {
    return this.orders;
  }

  getById(id: string): Order | undefined {
    return this.orders.find(o => o.id === id);
  }
}
