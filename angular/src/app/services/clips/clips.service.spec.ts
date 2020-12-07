import { TestBed } from '@angular/core/testing';

import { ClipsService } from './clips.service';

describe('ClipsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClipsService = TestBed.get(ClipsService);
    expect(service).toBeTruthy();
  });
});
