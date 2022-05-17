import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  public save(project: any): Observable<any> {
    return this.httpClient.post<any>(this.projectURL + 'agregar', project);
  }

  public update(id: number, project: any): Observable<any> {
    return this.httpClient.put<any>(this.projectURL + `editar/${id}`, project);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.projectURL + `eliminar/${id}`);
  }
}
