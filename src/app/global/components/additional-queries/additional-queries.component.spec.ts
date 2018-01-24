import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalQueriesComponent } from './additional-queries.component';

describe('AdditionalQueriesComponent', () => {
  let component: AdditionalQueriesComponent;
  let fixture: ComponentFixture<AdditionalQueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalQueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
