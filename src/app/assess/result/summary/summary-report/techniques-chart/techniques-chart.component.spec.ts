import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechniquesChartComponent } from './techniques-chart.component';

fdescribe('TechniquesChartComponent', () => {
  let component: TechniquesChartComponent;
  let fixture: ComponentFixture<TechniquesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechniquesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechniquesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
