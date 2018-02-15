import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsModule } from 'ng2-charts';

import { TechniquesChartComponent } from './techniques-chart.component';
import { SummaryCalculationService } from '../../summary-calculation.service';

describe('TechniquesChartComponent', () => {
  let component: TechniquesChartComponent;
  let fixture: ComponentFixture<TechniquesChartComponent>;

  const serviceMock = { barColors: ['color'], sophisticationNumberToWord: number => 'word'};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechniquesChartComponent ],
      imports: [ ChartsModule ],
      providers: [
        {
          provide: SummaryCalculationService,
          useValue: serviceMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechniquesChartComponent);
    component = fixture.componentInstance;
    component.techniqueBreakdown = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
