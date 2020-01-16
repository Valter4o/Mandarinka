import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfinishedComponent } from './notfinished.component';

describe('NotfinishedComponent', () => {
  let component: NotfinishedComponent;
  let fixture: ComponentFixture<NotfinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotfinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotfinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
