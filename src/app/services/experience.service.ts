import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  experienceURL = 'http://localhost:8080/experiencia/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Experience[]> {
    return this.httpClient.get<Experience[]>(this.experienceURL + 'lista');
  }

  public detail(id: number): Observable<Experience> {
    return this.httpClient.get<Experience>(this.experienceURL + `detalle/${id}`);
  }

  public save(experience: Experience): Observable<any> {
    return this.httpClient.post<any>(this.experienceURL + 'agregar', experience);
  }

  public update(id: number, experience: Experience): Observable<any> {
    return this.httpClient.put<any>(this.experienceURL + `editar/${id}`, experience);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.experienceURL + `eliminar/${id}`);
  }
}
