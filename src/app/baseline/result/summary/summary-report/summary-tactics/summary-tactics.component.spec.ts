import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { StoreModule } from '@ngrx/store';

import { SummaryTacticsComponent } from './summary-tactics.component';
import { mockAttackPatterns } from '../../../../../testing/mock-store';
import { reducers } from '../../../../../root-store/app.reducers';

const mockAttackPatternData = [
  {
      type: 'attack-pattern',
      id: mockAttackPatterns[0].id,
      attributes: {
          id: mockAttackPatterns[0].id,
          name: mockAttackPatterns[0].name,
          description: 'Attack Pattern #1',
          kill_chain_phases: [{phase_name: 'Something'}],
          x_mitre_data_sources: ['The Source'],
          x_mitre_platforms: ['iOS', 'Android']
      }
  },
  {
      type: 'attack-pattern',
      id: mockAttackPatterns[1].id,
      attributes: {
          id: mockAttackPatterns[1].id,
          name: mockAttackPatterns[1].name,
          description: 'Attack Pattern #2',
          kill_chain_phases: [{phase_name: 'Something Else'}],
          x_mitre_data_sources: ['Another Source'],
          x_mitre_platforms: ['AppleDOS', 'MS-DOS']
      }
  },
];

describe('SummaryTacticsComponent', () => {
  let component: SummaryTacticsComponent;
  let fixture: ComponentFixture<SummaryTacticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [ SummaryTacticsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryTacticsComponent);
    component = fixture.componentInstance;
    let mockApi = spyOn(component.genericApi, 'get').and.returnValue(Observable.of(mockAttackPatternData));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
