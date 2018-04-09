import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule, MatCheckbox } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { PublishedCheckboxComponent } from './published-checkbox.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

describe('PublishedCheckboxComponent', () => {
  let component: PublishedCheckboxComponent;
  let fixture: ComponentFixture<PublishedCheckboxComponent>;
  let overlayContainerElement: HTMLElement;

  let mockModel = {
    metaProperties: {
      published: true
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PublishedCheckboxComponent 
      ],
      imports: [
        MatCheckboxModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedCheckboxComponent);
    component = fixture.componentInstance;
    component.model = mockModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
