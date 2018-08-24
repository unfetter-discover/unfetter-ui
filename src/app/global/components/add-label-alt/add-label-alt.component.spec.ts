import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabelAltComponent } from './add-label-alt.component';

describe('AddLabelAltComponent', () => {
  let component: AddLabelAltComponent;
  let fixture: ComponentFixture<AddLabelAltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLabelAltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabelAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
