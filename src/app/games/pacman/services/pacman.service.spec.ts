import { TestBed } from '@angular/core/testing';

import { PacmanService } from './pacman.service';

describe('PacmanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PacmanService = TestBed.get(PacmanService);
    expect(service).toBeTruthy();
  });
});
