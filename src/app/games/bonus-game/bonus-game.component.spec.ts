import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusGameComponent } from './bonus-game.component';

describe('BonusGameComponent', () => {
  let component: BonusGameComponent;
  let fixture: ComponentFixture<BonusGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
