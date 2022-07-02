import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/user-details';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  userDetailsURL = 'http://localhost:8080/detalles-usuario/';

  constructor(private httpClient: HttpClient) { }

  public view(id: number): Observable<UserDetails> {
    return this.httpClient.get<UserDetails>(this.userDetailsURL + `ver/${id}`);
  }

  public save(userDetails: UserDetails, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('userDetails', JSON.stringify(userDetails));
    formData.append('image', image);
    return this.httpClient.post<any>(this.userDetailsURL + 'guardar', formData);
  }

  public update(id: number, userDetails: UserDetails, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('userDetails', JSON.stringify(userDetails));
    formData.append('image', image);
    return this.httpClient.put<any>(this.userDetailsURL + `actualizar/${id}`, formData);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.userDetailsURL + `eliminar/${id}`);
  }
}
