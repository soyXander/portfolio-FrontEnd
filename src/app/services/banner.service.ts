import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  bannerUrl: string = 'http://localhost:8080/banner/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<any> {
    return this.httpClient.get<any>(this.bannerUrl + 'lista');
  }

  public view(id: number): Observable<any> {
    return this.httpClient.get<any>(this.bannerUrl + `ver/${id}`);
  }

  public save(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.post<any>(this.bannerUrl + 'guardar', formData);
  }

  public update(id: number, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.put<any>(this.bannerUrl + `actualizar/${id}`, formData);
  }

  public exist(id: number): Observable<any> {
    return this.httpClient.get<any>(this.bannerUrl + `existe/${id}`);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.bannerUrl + `eliminar/${id}`);
  }
}
