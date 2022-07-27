import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectUrl = environment.apiUrl + 'proyecto/';
  constructor(private httpClient: HttpClient) { }

  public list(): Observable<any> {
    return this.httpClient.get<any>(this.projectUrl + 'lista');
  }

  public detail(id: number): Observable<any> {
    return this.httpClient.get<any>(this.projectUrl + `detalle/${id}`);
  }

  public save(project: Project, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('project', JSON.stringify(project));
    formData.append('image', image);
    return this.httpClient.post<any>(this.projectUrl + 'guardar', formData);
  }

  public update(id: number, project: Project, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('project', JSON.stringify(project));
    formData.append('image', image);
    return this.httpClient.put<any>(this.projectUrl + `actualizar/${id}`, formData);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.projectUrl + `eliminar/${id}`);
  }
}
