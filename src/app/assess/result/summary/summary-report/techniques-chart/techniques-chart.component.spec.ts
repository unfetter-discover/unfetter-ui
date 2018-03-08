import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsModule } from 'ng2-charts';

import { TechniquesChartComponent } from './techniques-chart.component';
import { SummaryCalculationService } from '../../summary-calculation.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('TechniquesChartComponent', () => {
  let component: TechniquesChartComponent;
  let fixture: ComponentFixture<TechniquesChartComponent>;

  const serviceMock = {
    barColors: ['color'], sophisticationNumberToWord: number => 'word', riskSub: new BehaviorSubject<number>(null), techniqueBreakdown: { a: 'b', c: 'd' },
    renderLegend: () => 'legend stuff'
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TechniquesChartComponent],
      imports: [ChartsModule],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
