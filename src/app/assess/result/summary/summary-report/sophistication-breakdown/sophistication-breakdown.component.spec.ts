import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { SophisticationBreakdownComponent } from './sophistication-breakdown.component';
import { SummaryCalculationService } from '../../summary-calculation.service';

@Component({
  template: '<sophistication-breakdown [assessedAttackPatterns]="assessedAttackPatternCountBySophisticationLevel"' +
            '[allAttackPatterns]="totalAttackPatternCountBySophisticationLevel"></sophistication-breakdown>'
})
class TestHostComponent {
  assessedAttackPatternCountBySophisticationLevel = {0: 16, 1: 13, 2: 16, 3: 2};
  totalAttackPatternCountBySophisticationLevel = {0: 29, 1: 30, 2: 34, 3: 4};
}

fdescribe('SophisticationBreakdownComponent', () => {
  let component: SophisticationBreakdownComponent;
  let fixture: ComponentFixture<SophisticationBreakdownComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let testHostComponent: TestHostComponent;

  const serviceMock = { barColors: ['color'], sophisticationNumberToWord: number => 'word'};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SophisticationBreakdownComponent, TestHostComponent ],
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
    hostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });
});
