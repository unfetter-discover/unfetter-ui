import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SophisticationBreakdownComponent } from './sophistication-breakdown.component';

describe('SophisticationBreakdownComponent', () => {
  let component: SophisticationBreakdownComponent;
  let fixture: ComponentFixture<SophisticationBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SophisticationBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SophisticationBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
