import { TestBed } from '@angular/core/testing';

import { StationsResolverService } from './stations-resolver.service';

describe('StationsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StationsResolverService = TestBed.get(StationsResolverService);
    expect(service).toBeTruthy();
  });
});
