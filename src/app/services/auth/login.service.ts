import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
interface LoginPayload {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.apiBaseUrl ;

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/login`, payload);
  }
}
