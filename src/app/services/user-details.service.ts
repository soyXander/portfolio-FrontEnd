import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../models/user-details';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  userDetailsUrl = environment.apiUrl + 'detalles-usuario/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<UserDetails[]> {
    return this.httpClient.get<UserDetails[]>(this.userDetailsUrl + 'lista');
  }

  public view(id: number): Observable<UserDetails> {
    return this.httpClient.get<UserDetails>(this.userDetailsUrl + `ver/${id}`);
  }

  public save(userDetails: UserDetails, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('userDetails', JSON.stringify(userDetails));
    formData.append('image', image);
    return this.httpClient.post<any>(this.userDetailsUrl + 'guardar', formData);
  }

  public update(id: number, userDetails: UserDetails, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('userDetails', JSON.stringify(userDetails));
    formData.append('image', image);
    return this.httpClient.put<any>(this.userDetailsUrl + `actualizar/${id}`, formData);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.userDetailsUrl + `eliminar/${id}`);
  }
}
