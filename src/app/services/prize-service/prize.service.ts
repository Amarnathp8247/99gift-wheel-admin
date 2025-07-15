import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8000/api/v1/admin/spin/prizes';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {
  constructor(private http: HttpClient) {}

  getAllPrizes(): Observable<any> {
    return this.http.get(BASE_URL);
  }

  createPrize(data: any): Observable<any> {
    return this.http.post(BASE_URL, data);
  }

  updatePrize(id: string, data: any): Observable<any> {
    return this.http.put(`${BASE_URL}/${id}`, data);
  }

  deletePrize(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`);
  }
}
