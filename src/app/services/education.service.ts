import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Education } from '../models/education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  educationUrl = environment.apiUrl + 'education/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Education[]> {
    return this.httpClient.get<Education[]>(this.educationUrl + 'lista');
  }

  public detail(id: number): Observable<Education> {
    return this.httpClient.get<Education>(this.educationUrl + `detalle/${id}`);
  }

  public save(education: Education, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('education', JSON.stringify(education));
    formData.append('image', image);
    return this.httpClient.post<any>(this.educationUrl + 'guardar', formData);
  }

  public update(id: number, education: Education, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('education', JSON.stringify(education));
    formData.append('image', image);
    return this.httpClient.put<any>(this.educationUrl + `actualizar/${id}`, formData);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.educationUrl + `eliminar/${id}`);
  }
}
