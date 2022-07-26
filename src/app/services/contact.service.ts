import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactURL = 'http://localhost:8080/contacto/';

  constructor(private httpClient: HttpClient) { }

  public send(contact: Contact): Observable<any> {
    const formData = new FormData();
    formData.append('contact', JSON.stringify(contact));
    return this.httpClient.post<any>(this.contactURL + 'enviar', formData);
  }
}
