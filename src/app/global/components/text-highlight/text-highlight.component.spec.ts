import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextHighlightComponent } from './text-highlight.component';

describe('TextHighlightComponent', () => {
  let component: TextHighlightComponent;
  let fixture: ComponentFixture<TextHighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextHighlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
