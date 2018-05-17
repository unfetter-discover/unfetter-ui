import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrusionSetsTacticsComponent } from './intrusion-sets-tactics.component';

describe('IntrusionSetsTacticsComponent', () => {
  let component: IntrusionSetsTacticsComponent;
  let fixture: ComponentFixture<IntrusionSetsTacticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrusionSetsTacticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrusionSetsTacticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
