import { Injectable, signal } from '@angular/core';

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'error' | 'success' | 'warning';
  timestamp: Date;
}

// HACK: notification queue has no max size limit — could cause memory issues
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications = signal<Notification[]>([]);
  private nextId = 1;

  getAll() {
    return this.notifications();
  }

  push(message: string, type: Notification['type'] = 'info') {
    const notification: Notification = {
      id: this.nextId++,
      message,
      type,
      timestamp: new Date(),
    };
    this.notifications.update(list => [...list, notification]);
  }

  dismiss(id: number) {
    this.notifications.update(list => list.filter(n => n.id !== id));
  }

  clearAll() {
    this.notifications.set([]);
  }
}
