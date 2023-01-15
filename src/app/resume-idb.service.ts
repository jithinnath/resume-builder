import { IResume } from './types';
import { IndexDBService } from './index-db.service';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResumeIDBService {
  constructor(private idb: IndexDBService) {}

  db: any;
  readonly dbName: string = 'resumesDB';
  readonly dataStore: string = 'resumes';
  readonly index: string = 'name';

  async openResumeDb() {
    if (!this.db) this.db = await this.idb.createDB(this.dbName, this.dataStore, this.index);
  }

  addResume(data: unknown) {
    this.idb.addData(this.db, this.dataStore, data);
  }

  getResume(id: number) {
    return this.idb.getData(this.db, this.dataStore, id);
  }

  getAllResumes() {
    return from(this.idb.getAllData(this.db, this.dataStore));
  }

  updateResume(data: unknown) {
    this.idb.updateData(this.db, this.dataStore, data);
  }

  deleteResume(id: number) {
    this.idb.deleteData(this.db, this.dataStore, id);
  }
}
