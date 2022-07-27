import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/login-user';
import { JwtDTO } from '../models/jwt-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = environment.apiUrl + 'auth/';

  constructor(private http: HttpClient) { }

  login(loginUser: LoginUser): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(this.loginUrl + 'login', loginUser);
  }

  refresh(jwtDTO: JwtDTO): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(this.loginUrl + 'refresh', jwtDTO);
  }

  /* register(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {username, password}, httpOptions);
  } */
}
