import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material';

import { TextHighlightComponent } from './text-highlight.component';

describe('TextHighlightComponent', () => {
  let component: TextHighlightComponent;
  let fixture: ComponentFixture<TextHighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextHighlightComponent ],
      imports: [MatButtonModule],
      schemas: [NO_ERRORS_SCHEMA]
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
