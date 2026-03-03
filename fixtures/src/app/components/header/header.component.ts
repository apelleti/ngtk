import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = signal('Demo App');
  upperTitle = computed(() => this.title().toUpperCase());

  updateTitle(newTitle: string) {
    this.title.set(newTitle);
  }
}
