import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/auth/loginRequest';
import { TokenResponse } from '../models/auth/tokenResponse';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { GetUserByEmailRequest } from '../models/auth/getUserByEmailRequest';
import { GetUserByEmailResponse } from '../models/auth/getUserByEmailResponse';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  controllerUrl: string = `${environment.MS_V1_API_URL}/auth`;
  constructor(private httpClient: HttpClient) {}

  token = localStorage.getItem('token');
  decodedEmail: GetUserByEmailRequest | null = null;


 login(loginRequest: LoginRequest): Observable<TokenResponse> {
    const url = `${this.controllerUrl}/login`
    return this.httpClient.post<TokenResponse>(url, loginRequest);
  }
  

  getUserByEmail(getUserByEmailRequest: GetUserByEmailRequest): Observable<GetUserByEmailResponse>{
    const url = `${this.controllerUrl}/getByEmail`; 
    return this.httpClient.post<GetUserByEmailResponse>(url, getUserByEmailRequest);
  }


  getUser(): Observable<GetUserByEmailResponse | null> {
    const decodedEmail = this.decodeToken();
    if (decodedEmail) {
      return this.getUserByEmail(decodedEmail).pipe(
        catchError(error => {
          console.error('Error fetching user:', error);
          return of(null);
        })
      );
    } else {
      console.log('No valid token found');
      return of(null); 
    }
  }

  decodeToken(): GetUserByEmailRequest | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: { sub: string } = jwtDecode(token);
        return {email: decodedToken.sub};
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    }
    return null;
  } 

/*
  //deneme
  private userSubject = new BehaviorSubject<GetUserByEmailResponse | null>(null);
  user$ = this.userSubject.asObservable();
  
login(loginRequest: LoginRequest): Observable<TokenResponse> {
  const url = `${this.controllerUrl}/login`;
  return this.httpClient.post<TokenResponse>(url, loginRequest).pipe(
    tap(tokenResponse => {
      if (tokenResponse && tokenResponse.token) {
        localStorage.setItem('token', tokenResponse.token);
        const decodedEmail = this.decodeToken();
        if (decodedEmail) {
          this.getUserByEmail(decodedEmail).subscribe(user => {
            this.userSubject.next(user);
            // Kullanıcı bilgilerini yerel depolamaya kaydet
            if (user) {
              localStorage.setItem('user', JSON.stringify(user));
            }
          });
        }
      }
    })
  )
}

getUserByEmail(getUserByEmailRequest: GetUserByEmailRequest): Observable<GetUserByEmailResponse> {
  const url = `${this.controllerUrl}/getByEmail`; 
  return this.httpClient.post<GetUserByEmailResponse>(url, getUserByEmailRequest);
}


getUser(): Observable<GetUserByEmailResponse | null> {
  const decodedEmail = this.decodeToken();
  if (decodedEmail) {
    return this.getUserByEmail(decodedEmail).pipe(
      catchError(error => {
        console.error('Error fetching user:', error);
        return of(null);
      })
    );
  } else {
    console.log('No valid token found');
    return of(null); 
  }
}


decodeToken(): GetUserByEmailRequest | null {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken: { sub: string } = jwtDecode(token);
      return { email: decodedToken.sub };
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  return null;
} 


setUser(user: GetUserByEmailResponse | null) {
  this.userSubject.next(user);
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
}
*/
  
}

