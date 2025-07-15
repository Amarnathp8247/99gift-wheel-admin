import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinService {

  private baseUrl = 'http://localhost:8000/api/v1/admin/spin';

  constructor(private http: HttpClient) {}

  updateConfig(config: any, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.baseUrl}/config`, config, { headers });
  }

  getPrizes(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.baseUrl}/prizes`, { headers });
  }

  createConfig(data: any, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.baseUrl}/config`, data, { headers });
  }
  
  getConfigs(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.baseUrl}/config`, { headers });
  }
  
}