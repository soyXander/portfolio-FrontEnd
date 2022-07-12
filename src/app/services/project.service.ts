import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectURL = 'http://localhost:8080/proyecto/';
  constructor(private httpClient: HttpClient) { }

  public list(): Observable<any> {
    return this.httpClient.get<any>(this.projectURL + 'lista');
  }

  public detail(id: number): Observable<any> {
    return this.httpClient.get<any>(this.projectURL + `detalle/${id}`);
  }

  public save(project: Project, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('project', JSON.stringify(project));
    formData.append('image', image);
    return this.httpClient.post<any>(this.projectURL + 'guardar', formData);
  }

  public update(id: number, project: Project, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('project', JSON.stringify(project));
    formData.append('image', image);
    return this.httpClient.put<any>(this.projectURL + `actualizar/${id}`, formData);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.projectURL + `eliminar/${id}`);
  }
}
