import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menuItems = ['Dashboard', 'Settings', 'Help'];
  isCollapsed = false;

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }
}
