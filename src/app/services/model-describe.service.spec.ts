import { TestBed, inject } from '@angular/core/testing';

import { ModelDescribeService } from './model-describe.service';

describe('ModelDescribeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelDescribeService]
    });
  });

  it('should be created', inject([ModelDescribeService], (service: ModelDescribeService) => {
    expect(service).toBeTruthy();
  }));
});
