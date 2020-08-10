import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Establishment } from 'src/app/model/establishment';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentsService {
  constructor(private http: HttpClient) {}

  getEstablishments(): Observable<Establishment[]> {
    return this.http.get<Establishment[]>(
      'https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments'
    );
  }

  getEstablishmentById(id: string): Observable<Establishment> {
    return this.http.get<Establishment>(
      `https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments/${id}`
    );
  }
}
