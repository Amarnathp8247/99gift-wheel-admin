import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpinService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  updateConfig(config: any, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.baseUrl}/admin/spin/config`, config, { headers });
  }

  getPrizes(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.baseUrl}/admin/spin/prizes`, { headers });
  }

  createConfig(data: any, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.baseUrl}/admin/spin/config`, data, { headers });
  }
  
  getConfigs(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.baseUrl}/admin/spin/config`, { headers });
  }
  
}