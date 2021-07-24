import { TestBed } from '@angular/core/testing';

import { MammaService } from './mamma.service';

describe('MammaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MammaService = TestBed.get(MammaService);
    expect(service).toBeTruthy();
  });
});
