import { Component, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  title = signal('My App');
  subtitle = computed(() => `Welcome to ${this.title()}`);

  ngOnInit() {}
}
