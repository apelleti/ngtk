import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

// TODO: integrate with backend user API to fetch real profile data
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  user = signal({
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: '/assets/avatar.png',
    joinDate: '2023-06-15',
  });

  displayName = computed(() => this.user().name.toUpperCase());

  // HACK: editing profile in-place without a proper form — refactor later
  isEditing = signal(false);

  toggleEdit() {
    this.isEditing.update(v => !v);
  }
}
