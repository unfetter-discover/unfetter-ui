import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from 'app/root-store/app.reducers';
import { Report } from '../../models/report';
import { ThreatReport } from '../models/threat-report.model';
import { MitigationComponent } from './mitigation.component';

describe('MitigationComponent', () => {
  let component: MitigationComponent;
  let fixture: ComponentFixture<MitigationComponent>;
  let threatReport: ThreatReport;

  beforeEach(async(() => {
    const modules = [
      FormsModule,
      ReactiveFormsModule,
    ];

    const materialModules = [
      MatButtonModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatSelectModule,
    ];

    TestBed
      .configureTestingModule({
        imports: [
          NoopAnimationsModule,
          RouterTestingModule,
          ...modules,
          ...materialModules,
          StoreModule.forRoot({
            ...fromRoot.reducers,
          }),
        ],
        declarations: [MitigationComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    threatReport = mockThreatReport();
    fixture = TestBed.createComponent(MitigationComponent);
    component = fixture.componentInstance;
    component.threatReport = threatReport;
    fixture.detectChanges();
  });

  it('should create with threat report', () => {
    expect(component).toBeTruthy();
    expect(component.threatReport).toBeTruthy();
  });

  it('should determine unique attack pattern ids', () => {
    expect(component).toBeTruthy();
    expect(component.threatReport).toBeTruthy();
    const ids = component.threatReportToUniqueAttackPatternIds(component.threatReport);
    expect(ids).toBeDefined();
    expect(Array.isArray(ids)).toBeTruthy();
    expect(ids.length).toEqual(4);
    expect(ids[0]).toEqual('attack-pattern--1');
  })

  /**
   * @description mock out a threat report with 2 reports and a few attack patterns refs
   */
  function mockThreatReport(): ThreatReport {
    const attackPatternIdSet1 = [
      'attack-pattern--1',
      'attack-pattern--2',
      'attack-pattern--3',
    ];
    const attackPatternIdSet2 = [
      'attack-pattern--2',
      'attack-pattern--3',
      'attack-pattern--45',
    ];
    const report1 = new Report();
    report1.attributes.object_refs = [...attackPatternIdSet1];
    const report2 = new Report();
    report2.attributes.object_refs = [...attackPatternIdSet2];
    threatReport = new ThreatReport();
    threatReport.reports = [report1, report2];
    return threatReport;
  }
});
