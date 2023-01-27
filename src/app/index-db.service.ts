import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class IndexDBService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async createDB(dbName: string, dataStore: string, index: string) {
    // Using https://github.com/jakearchibald/idb
    let db = undefined;
    try {
      db = await openDB(dbName, 1, {
        upgrade(db, oldVersion, newVersion, transaction) {
          switch (oldVersion) {
            case 0:
            // Placeholder to execute when database is created (oldVersion is 0)
            // eslint-disable-next-line no-fallthrough
            case 1: {
              // Create a store of objects
              const resumeStore = db.createObjectStore(dataStore, {
                // The `id` property of the object will be the key, and be incremented automatically
                autoIncrement: true,
                keyPath: 'id',
              });
              // Create an index called `name` based on the `type` property of objects in the store
              resumeStore.createIndex(index, index, { unique: false });
              console.log('Database and Data store created');
            }
          }
        },
      });
      return db;
    } catch (error) {
      return db;
    }
  }

  // Using https://github.com/jakearchibald/idb
  async addData(db: any, dataStore: string, data: unknown) {
    if (!db) {
      console.log('Database is closed');
      return;
    }
    try {
      const tx = await db.transaction(dataStore, 'readwrite');
      const store = tx.objectStore(dataStore);
      store.add(data);
      await tx.done;
      console.log('New resume added to database');
    } catch (error) {
      console.error('Error while saving data to db', error);
    }
  }

  // Using https://github.com/jakearchibald/idb
  async getData(db: any, dataStore: string, id: number) {
    try {
      const tx = await db.transaction(dataStore, 'readonly');
      const store = tx.objectStore(dataStore);
      return await store.get(id);
    } catch (error) {
      console.error('Error while fetching data from db, id:', id, error);
    }
  }

  async updateData(db: any, dataStore: string, data: unknown) {
    try {
      const tx = await db.transaction(dataStore, 'readwrite');
      const store = tx.objectStore(dataStore);
      return await store.put(data);
    } catch (error) {
      console.error('Error while updating data to db', error);
    }
  }

  async getAllData(db: any, dataStore: string) {
    try {
      const tx = await db.transaction(dataStore, 'readonly');
      const store = tx.objectStore(dataStore);
      return await store.getAll();
      //console.dir(value)
    } catch (error) {
      console.error('Error while fetching data from db', error);
    }
  }

  async deleteData(db: any, dataStore: string, id: number) {
    try {
      const tx = await db.transaction(dataStore, 'readwrite');
      const store = tx.objectStore(dataStore);
      await store.delete(id);
      await tx.done;
    } catch (error) {
      console.error('Error while deleting data from db', error);
    }
  }
}
