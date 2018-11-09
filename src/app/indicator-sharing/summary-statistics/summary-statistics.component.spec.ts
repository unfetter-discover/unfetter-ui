import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';

import { SummaryStatisticsComponent } from './summary-statistics.component';
import { IndicatorSharingService } from '../indicator-sharing.service';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../root-store/app.reducers';
import { SetIdentities } from '../../root-store/stix/stix.actions';

describe('SummaryStatisticsComponent', () => {
  let component: SummaryStatisticsComponent;
  let fixture: ComponentFixture<SummaryStatisticsComponent>;

  const mockIdentities = [
    {
      id: 'identity--1234',
      name: 'testorg1',
      identity_class: 'organization'
    },
    {
      id: 'identity--5678',
      name: 'testorg2',
      identity_class: 'organization'
    }
  ];

  const indicatorSharingServiceMock = {
    getSummaryStatistics: () => {
      return observableOf([
        {
          _id: 'identity--1234',
          count: 2.0,
          views: 2,
          likes: 1,
          comments: 1.0
        },
        {
          _id: 'identity--5678',
          count: 1.0,
          views: 1,
          likes: 3,
          comments: 3.0
        }
      ]);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SummaryStatisticsComponent,
        CapitalizePipe
      ],
      imports: [
        StoreModule.forRoot(reducers)
      ],
      providers: [
        {
          provide: IndicatorSharingService,
          useValue: indicatorSharingServiceMock
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryStatisticsComponent);
    component = fixture.componentInstance;
    const store = component.store;
    store.dispatch(new SetIdentities(mockIdentities as any));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct mostIndicators', () => {
    expect(component.theMost.count.org).toEqual('testorg1');
    expect(component.theMost.count.number).toEqual(2);
  });

  it('should have correct mostViews', () => {
    expect(component.theMost.views.org).toEqual('testorg1');
    expect(component.theMost.views.number).toEqual(2);
  });

  it('should have correct mostLiked', () => {
    expect(component.theMost.likes.org).toEqual('testorg2');
    expect(component.theMost.likes.number).toEqual(3);
  });

  it('should have correct mostComments', () => {
    expect(component.theMost.comments.org).toEqual('testorg2');
    expect(component.theMost.comments.number).toEqual(3);
  });

  it('should have correct barChartData', () => {
    const expected = { 
      'count': [
        { 'data': [2], 'label': 'testorg1' },
        { 'data': [1], 'label': 'testorg2' }
      ], 
      'views': [
        { 'data': [2], 'label': 'testorg1' }, 
        { 'data': [1], 'label': 'testorg2' }
      ], 
      'likes': [
        { 'data': [1], 'label': 'testorg1' }, 
        { 'data': [3], 'label': 'testorg2' }
      ], 
      'comments': [
        { 'data': [1], 'label': 'testorg1' }, 
        { 'data': [3], 'label': 'testorg2' }
      ] 
    };
    expect(component.barChartData).toEqual(expected);
  });
});
