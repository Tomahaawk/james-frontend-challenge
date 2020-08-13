import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { Stores } from '../enums/db-stores.enum';

@Injectable()
export class IdbService {
  db: IDBPDatabase;

  constructor() {}

  async openDatabase(): Promise<void> {
    this.db = await openDB('james-challenge', 1, {
      upgrade(db) {
        db.createObjectStore(Stores.ESTABLISHMENTS, { keyPath: 'id' });
      },
      terminated() {
        alert('Something went wrong!');
      },
    });
  }
}
