import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { IdbService } from './idb.service';
import { Establishment } from 'src/app/model/establishment';
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb';
import { Stores } from '../model/db-stores.enum';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentsService {
  private db: IDBPDatabase;
  private _establishments: Establishment[] = [];

  $establishments: BehaviorSubject<Establishment[]> = new BehaviorSubject(
    this._establishments
  );

  constructor(private http: HttpClient, private idbService: IdbService) {
    this.db = idbService.db;
    this.getAllValues().then((dbValues) => {
      // Since we are working with static data, no need to overcomplicate things.
      // If the local database is empty, we populate it with the server data.
      if (!dbValues.length) {
        this.getEstablishments();
        this.$establishments.subscribe((establishments) => {
          this.insertValues(establishments);
        });
      } else {
        this._establishments = dbValues;
        this.$establishments.next(this._establishments);
      }
    });
  }

  private getEstablishments(): void {
    this.http
      .get<Establishment[]>(
        'https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments'
      )
      .subscribe((res) => {
        this.$establishments.next(res);
        this._establishments = res;
      });
  }

  private insertValues(establishments: Establishment[]): void {
    establishments.forEach((item) => {
      let transaction = this.db.transaction(Stores.ESTABLISHMENTS, 'readwrite');
      transaction.store.add(item);
      transaction.done
        .then(() => console.log('success'))
        .catch(() => console.log('failed trying to inset duplicated key'));
    });
  }

  private async getAllValues(): Promise<Establishment[]> {
    const establishments = await this.db.getAll(Stores.ESTABLISHMENTS);
    return establishments;
  }

  // getEstablishmentById(id: string): Observable<Establishment> {
  //   return this.http.get<Establishment>(
  //     `https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments/${id}`
  //   );
  // }

  async getEstablishmentById(id: string): Promise<Establishment> {
    let transaction = this.db.transaction(Stores.ESTABLISHMENTS, 'readonly');
    const establishment = transaction.store.get(id);
    return establishment;
  }

  async saveEstablishmentData(values: Establishment) {
    let transaction = this.db.transaction(Stores.ESTABLISHMENTS, 'readwrite');
    return transaction.store.put(values);
  }
}
