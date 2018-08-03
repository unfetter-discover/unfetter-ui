import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorFormComponent } from './indicator-form.component';

describe('IndicatorFormComponent', () => {
  let component: IndicatorFormComponent;
  let fixture: ComponentFixture<IndicatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
