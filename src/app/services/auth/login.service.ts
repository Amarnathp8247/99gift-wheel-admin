import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface LoginPayload {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8000/api/v1/admin';

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, payload);
  }
}
