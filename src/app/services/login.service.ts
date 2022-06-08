import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/login-user';
import { JwtDTO } from '../models/jwt-dto';

const AUTH_API = 'http://localhost:8080/auth/';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(loginUser: LoginUser): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(AUTH_API + 'login', loginUser);
  }

  /* register(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {username, password}, httpOptions);
  } */
}
