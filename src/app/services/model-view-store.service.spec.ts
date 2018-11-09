import { TestBed, inject } from '@angular/core/testing';

import { ModelViewStoreService } from './model-view-store.service';

describe('ModelViewStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelViewStoreService]
    });
  });

  it('should be created', inject([ModelViewStoreService], (service: ModelViewStoreService) => {
    expect(service).toBeTruthy();
  }));
});
