import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatHeaderComponent } from './threat-header.component';

describe('ThreatHeaderComponent', () => {
  let component: ThreatHeaderComponent;
  let fixture: ComponentFixture<ThreatHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreatHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
