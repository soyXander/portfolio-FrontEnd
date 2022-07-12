import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  skillURL = 'http://localhost:8080/habilidad/';
  constructor(private httpClient: HttpClient) { }

  public list(): Observable<any> {
    return this.httpClient.get<any>(this.skillURL + 'lista');
  }

  public detail(id: number): Observable<any> {
    return this.httpClient.get<any>(this.skillURL + `detalle/${id}`);
  }

  public save(skill: any): Observable<any> {
    return this.httpClient.post<any>(this.skillURL + 'guardar', skill);
  }

  public update(id: number, skill: any): Observable<any> {
    return this.httpClient.put<any>(this.skillURL + `actualizar/${id}`, skill);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.skillURL + `eliminar/${id}`);
  }
}
