import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatTacticsComponent } from './threat-tactics.component';

describe('ThreatTacticsComponent', () => {
  let component: ThreatTacticsComponent;
  let fixture: ComponentFixture<ThreatTacticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreatTacticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatTacticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
