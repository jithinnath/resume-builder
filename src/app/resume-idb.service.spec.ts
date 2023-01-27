import { TestBed } from '@angular/core/testing';

import { ResumeIDBService } from './resume-idb.service';

describe('ResumeIDBService', () => {
  let service: ResumeIDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumeIDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
