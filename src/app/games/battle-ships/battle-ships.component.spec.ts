import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleShipsComponent } from './battle-ships.component';

describe('BattleShipsComponent', () => {
  let component: BattleShipsComponent;
  let fixture: ComponentFixture<BattleShipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleShipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
