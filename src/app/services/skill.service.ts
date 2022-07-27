import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  skillUrl = environment.apiUrl + 'habilidad/';
  constructor(private httpClient: HttpClient) { }

  public list(): Observable<any> {
    return this.httpClient.get<any>(this.skillUrl + 'lista');
  }

  public detail(id: number): Observable<any> {
    return this.httpClient.get<any>(this.skillUrl + `detalle/${id}`);
  }

  public save(skill: any): Observable<any> {
    return this.httpClient.post<any>(this.skillUrl + 'guardar', skill);
  }

  public update(id: number, skill: any): Observable<any> {
    return this.httpClient.put<any>(this.skillUrl + `actualizar/${id}`, skill);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.skillUrl + `eliminar/${id}`);
  }
}
