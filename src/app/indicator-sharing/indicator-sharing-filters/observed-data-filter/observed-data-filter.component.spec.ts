import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservedDataFilterComponent } from './observed-data-filter.component';

describe('ObservedDataFilterComponent', () => {
  let component: ObservedDataFilterComponent;
  let fixture: ComponentFixture<ObservedDataFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservedDataFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservedDataFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
