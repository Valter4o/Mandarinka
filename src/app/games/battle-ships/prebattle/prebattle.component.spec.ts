import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebattleComponent } from './prebattle.component';

describe('PrebattleComponent', () => {
  let component: PrebattleComponent;
  let fixture: ComponentFixture<PrebattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrebattleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
