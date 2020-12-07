import { TestBed } from '@angular/core/testing';

import { MultimediasService } from './multimedias.service';

describe('MultimediasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MultimediasService = TestBed.get(MultimediasService);
    expect(service).toBeTruthy();
  });
});
