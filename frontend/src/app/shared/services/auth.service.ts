import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/auth/loginRequest';
import { TokenResponse } from '../models/auth/tokenResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  controllerUrl: string = `${environment.MS_V1_API_URL}/auth`;
  constructor(private httpClient: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<TokenResponse> {
    const url = `${this.controllerUrl}/login`
    return this.httpClient.post<TokenResponse>(url, loginRequest);
  }
  
}
