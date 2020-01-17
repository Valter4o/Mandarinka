import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostBonusComponent } from './lost-bonus.component';

describe('LostBonusComponent', () => {
  let component: LostBonusComponent;
  let fixture: ComponentFixture<LostBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
