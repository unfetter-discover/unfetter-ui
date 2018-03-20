import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SummaryStatisticsComponent } from './summary-statistics.component';
import { IndicatorSharingService } from '../indicator-sharing.service';

describe('SummaryStatisticsComponent', () => {
  let component: SummaryStatisticsComponent;
  let fixture: ComponentFixture<SummaryStatisticsComponent>;

  const indicatorSharingServiceMock = {
    getSummaryStatistics: () => {
      return Observable.of([
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
    },
    getIdentities: () => {
      return Observable.of([
        {
          id: 'identity--1234',
          type: 'identity',
          attributes: {
            id: 'identity--1234',
            name: 'testorg1',
            identity_class: 'organization'
          }          
        },
        {
          id: 'identity--5678',
          type: 'identity',
          attributes: {
            id: 'identity--5678',
            name: 'testorg2',
            identity_class: 'organization'
          }
        }
      ]);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryStatisticsComponent ],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct mostIndicators', () => {
    expect(component.mostIndicators.org).toEqual('testorg1');
    expect(component.mostIndicators.number).toEqual(2);
  });

  it('should have correct mostViews', () => {
    expect(component.mostViewed.org).toEqual('testorg1');
    expect(component.mostViewed.number).toEqual(2);
  });

  it('should have correct mostLiked', () => {
    expect(component.mostLiked.org).toEqual('testorg2');
    expect(component.mostLiked.number).toEqual(3);
  });

  it('should have correct mostComments', () => {
    expect(component.mostComments.org).toEqual('testorg2');
    expect(component.mostComments.number).toEqual(3);
  });
});
