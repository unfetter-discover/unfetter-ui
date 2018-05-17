import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorTacticsComponent } from './indicator-tactics.component';

describe('IndicatorTacticsComponent', () => {
  let component: IndicatorTacticsComponent;
  let fixture: ComponentFixture<IndicatorTacticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorTacticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorTacticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
