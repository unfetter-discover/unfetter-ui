import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryHeatmapComponent } from './summary-heatmap.component';

describe('SummaryHeatmapComponent', () => {
  let component: SummaryHeatmapComponent;
  let fixture: ComponentFixture<SummaryHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryHeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
