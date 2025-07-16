import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = environment.apiBaseUrl;

  stats = signal({
    totalUsers: 0,
    totalSpins: 0,
    totalWinners: 0,
    totalLosers: 0,
    totalWalletAmount: 0,
  });

  recentWinners = signal<any[]>([]);
  recentLosers = signal<any[]>([]);
  walletUpdates = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  fetchDashboardData() {
    return this.http.get<any>(`${this.baseUrl}/dashboard/dashboard-stats`);
  }

  loadDashboardData() {
    this.fetchDashboardData().subscribe((res) => {
      if (res.status) {
        this.stats.set(res.data.stats);
        this.recentWinners.set(res.data.recentWinners);
        this.recentLosers.set(res.data.recentLosers);
        this.walletUpdates.set(res.data.walletUpdates);
      }
    });
  }
}
