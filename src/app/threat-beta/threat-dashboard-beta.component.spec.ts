import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalModule } from '../global/global.module';
import { ThreatDashboardBetaComponent } from './threat-dashboard-beta.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ThreatDashboardBetaComponent', () => {
  let component: ThreatDashboardBetaComponent;
  let fixture: ComponentFixture<ThreatDashboardBetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThreatDashboardBetaComponent],
      imports: [GlobalModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatDashboardBetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
