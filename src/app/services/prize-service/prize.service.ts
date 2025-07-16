import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PrizeService {
  private baseUrl = environment.apiBaseUrl; 
  constructor(private http: HttpClient) {}

  getAllPrizes(): Observable<any> {
    return this.http.get(this.baseUrl+'admin/spin/prizes');
  }

  createPrize(data: any): Observable<any> {
    return this.http.post(this.baseUrl+'admin/spin/prizes', data);
  }

  updatePrize(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/spin/prizes/${id}`, data);
  }

  deletePrize(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
