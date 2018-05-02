import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticCarouselControlComponent } from './tactic-carousel-control.component';

describe('TacticCarouselControlComponent', () => {
  let component: TacticCarouselControlComponent;
  let fixture: ComponentFixture<TacticCarouselControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacticCarouselControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacticCarouselControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
