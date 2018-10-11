import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalFeedComponent } from './global-feed.component';
import { RecentReportsComponent } from './recent-reports/recent-reports.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('GlobalFeedComponent', () => {
  let component: GlobalFeedComponent;
  let fixture: ComponentFixture<GlobalFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalFeedComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
