import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorSharingFiltersComponent } from './indicator-sharing-filters.component';

describe('IndicatorSharingFiltersComponent', () => {
  let component: IndicatorSharingFiltersComponent;
  let fixture: ComponentFixture<IndicatorSharingFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorSharingFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorSharingFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
