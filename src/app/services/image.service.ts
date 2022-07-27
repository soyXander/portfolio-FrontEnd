import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageURL = environment.apiUrl + 'image/';

  constructor(private httpClient: HttpClient) { }

  public getImage(name: string): Observable<Image> {
    return this.httpClient.get<Image>(this.imageURL + `ver/${name}`);
  }

  public getImageDetails(name: string): Observable<Image> {
    return this.httpClient.get<Image>(this.imageURL + `info/${name}`);
  }

  public save(image: Image): Observable<any> {
    return this.httpClient.post<any>(this.imageURL + 'subir', image);
  }

  public deleteImage(name: string): Observable<any> {
    return this.httpClient.delete<any>(this.imageURL + `eliminar/${name}`);
  }
}
