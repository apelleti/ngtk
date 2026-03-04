import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  private notifService = inject(NotificationService);
  // FIXME: notifications are not dismissed automatically after timeout

  dismiss(id: number) {
    this.notifService.dismiss(id);
  }
}
