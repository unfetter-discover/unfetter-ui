import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material';

import { SummaryHeaderComponent } from './summary-header.component';

describe('SummaryHeaderComponent', () => {
  let component: SummaryHeaderComponent;
  let fixture: ComponentFixture<SummaryHeaderComponent>;

  const materialModules = [
    MatListModule
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [materialModules],
      declarations: [SummaryHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
