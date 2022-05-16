import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../models/education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  educationURL = 'http://localhost:8080/educacion/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Education[]> {
    return this.httpClient.get<Education[]>(this.educationURL + 'lista');
  }

  public detail(id: number): Observable<Education> {
    return this.httpClient.get<Education>(this.educationURL + `detalle/${id}`);
  }

  public save(education: Education): Observable<any> {
    return this.httpClient.post<any>(this.educationURL + 'agregar', education);
  }

  public update(id: number, education: Education): Observable<any> {
    return this.httpClient.put<any>(this.educationURL + `editar/${id}`, education);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.educationURL + `eliminar/${id}`);
  }
}
