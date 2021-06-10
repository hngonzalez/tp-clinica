import { TestBed } from '@angular/core/testing';

import { StorageIMGService } from './storage-img.service';

describe('StorageIMGService', () => {
  let service: StorageIMGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageIMGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
