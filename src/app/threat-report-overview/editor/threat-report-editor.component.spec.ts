import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatReportEditorComponent } from './threat-report-editor.component';

describe('ThreatReportEditorComponent', () => {
  let component: ThreatReportEditorComponent;
  let fixture: ComponentFixture<ThreatReportEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreatReportEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatReportEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
