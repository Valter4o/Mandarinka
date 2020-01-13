import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SudoKuComponent } from './sudo-ku.component';

describe('SudoKuComponent', () => {
  let component: SudoKuComponent;
  let fixture: ComponentFixture<SudoKuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SudoKuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SudoKuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
