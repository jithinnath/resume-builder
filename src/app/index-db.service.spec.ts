import { TestBed } from '@angular/core/testing';

import { IndexDBService } from './index-db.service';

describe('IndexDBService', () => {
  let service: IndexDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
