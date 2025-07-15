import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderSidebarComponent } from '../../layout-pages/header-sidebar/header-sidebar.component';

@Component({
  selector: 'app-wallet',
  standalone: true, // ✅ Required for standalone components
  imports: [CommonModule, HeaderSidebarComponent],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    console.log('Sidebar toggled:', this.isSidebarCollapsed);
  }
}
