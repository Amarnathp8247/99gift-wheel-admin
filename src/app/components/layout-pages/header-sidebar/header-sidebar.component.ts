import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header-sidebar.component.html',
  styleUrls: ['./header-sidebar.component.scss']
})
export class HeaderSidebarComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
