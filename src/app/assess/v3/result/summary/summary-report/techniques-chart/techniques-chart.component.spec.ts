import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ChartsModule } from 'ng2-charts';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SummaryCalculationService } from '../../summary-calculation.service';
import { TechniquesChartComponent } from './techniques-chart.component';

describe('TechniquesChartComponent', () => {
  let component: TechniquesChartComponent;
  let fixture: ComponentFixture<TechniquesChartComponent>;

  const serviceMock = {
    barColors: ['color'], sophisticationNumberToWord: number => 'word', riskSub: new BehaviorSubject<number>(null), techniqueBreakdown: { a: '1', c: '.33' },
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

  it('should generate appropriate values', () => {
    expect(component.barChartData[0].data[0]).toBe(100);
    expect(component.barChartData[0].data[1]).toBe(33);
  })
});
