import { TestBed } from '@angular/core/testing';

import { SudokuServiceService } from './sudoku-service.service';

describe('SudokuServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SudokuServiceService = TestBed.get(SudokuServiceService);
    expect(service).toBeTruthy();
  });
});
