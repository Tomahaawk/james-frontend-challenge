import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Establishment } from 'src/app/model/establishment';
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentsService {
  private db: IDBPDatabase;
  private _establishments: Establishment[] = [];

  $establishments: BehaviorSubject<Establishment[]> = new BehaviorSubject(
    this._establishments
  );

  constructor(private http: HttpClient) {
    this.openDatabase()
      .then(() => {
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
      })
      .catch((err) => console.error(err));
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

  private async openDatabase(): Promise<void> {
    this.db = await openDB('james-challenge', 1, {
      upgrade(db) {
        db.createObjectStore(Stores.ESTABLISHMENTS, { keyPath: 'id' });
      },
      terminated() {
        alert('Something went wrong!');
      },
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

enum Stores {
  ESTABLISHMENTS = 'establishments',
}
