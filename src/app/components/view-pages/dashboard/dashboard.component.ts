import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderSidebarComponent } from '../../layout-pages/header-sidebar/header-sidebar.component';
import { DashboardService } from '../../../services/dashboard-service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderSidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  isSidebarCollapsed = false;
  currentDate = '';

  constructor(public dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.setCurrentDate();
    this.dashboardService.loadDashboardData();
  }

  setCurrentDate(): void {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    this.currentDate = new Date().toLocaleDateString('en-US', options);
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
