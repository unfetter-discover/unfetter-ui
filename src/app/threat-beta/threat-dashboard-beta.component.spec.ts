import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatDashboardBetaComponent } from './threat-dashboard-beta.component';

describe('ThreatDashboardBetaComponent', () => {
  let component: ThreatDashboardBetaComponent;
  let fixture: ComponentFixture<ThreatDashboardBetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreatDashboardBetaComponent ]
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
