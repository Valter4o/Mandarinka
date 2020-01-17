import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WonBonusComponent } from './won-bonus.component';

describe('WonBonusComponent', () => {
  let component: WonBonusComponent;
  let fixture: ComponentFixture<WonBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WonBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WonBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
