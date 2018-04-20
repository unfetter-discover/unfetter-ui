import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilityComponent } from './capability.component';

describe('CapabilityComponent', () => {
  let component: CapabilityComponent;
  let fixture: ComponentFixture<CapabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
