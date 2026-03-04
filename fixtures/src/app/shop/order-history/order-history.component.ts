import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent {
  /* FIXME: load order history from OrderService with proper pagination */
  orders = signal([
    { id: 'ORD-001', date: '2024-01-15', total: 209.98, status: 'delivered' },
    { id: 'ORD-002', date: '2024-02-20', total: 79.99, status: 'shipped' },
    { id: 'ORD-003', date: '2024-03-05', total: 339.97, status: 'processing' },
  ]);
}
