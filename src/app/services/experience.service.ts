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

  public save(experience: Experience, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('experience', JSON.stringify(experience));
    formData.append('image', image);
    return this.httpClient.post<any>(this.experienceURL + 'agregar', formData);
  }

  public update(id: number, experience: Experience, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('experience', JSON.stringify(experience));
    formData.append('image', image);
    return this.httpClient.put<any>(this.experienceURL + `editar/${id}`, formData);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.experienceURL + `eliminar/${id}`);
  }
}
