import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent {
  @Input() title: string = 'Default';
  @Input() subtitle: string = '';
  @Input() showBorder: boolean = false;
  @Output() closed = new EventEmitter<void>();
  @Output() resized = new EventEmitter<{ width: number; height: number }>();

  onClose() {
    this.closed.emit();
  }
}
