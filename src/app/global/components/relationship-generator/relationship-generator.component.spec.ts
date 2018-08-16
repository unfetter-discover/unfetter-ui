import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSelectModule } from '@angular/material';
import { of as observableOf, Observable } from 'rxjs';

import { RelationshipGeneratorComponent } from './relationship-generator.component';
import { GenericApi } from '../../../core/services/genericapi.service';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { FieldSortPipe } from '../../pipes/field-sort.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('RelationshipGeneratorComponent', () => {
  let component: RelationshipGeneratorComponent;
  let fixture: ComponentFixture<RelationshipGeneratorComponent>;
  let overlayContainerElement: HTMLElement;
  let selectEl: HTMLInputElement;

  const mockModel = {
    attributes: {
      metaProperties: {
        relationships: []
      }
    }
  };

  const mockGenericApi = {
    get(url: string): Observable<any> {
      return observableOf([
        {
          attributes: {
            id: 'attack-pattern-1234',
            name: 'testap'
          }
        }
      ]);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        RelationshipGeneratorComponent,
        CapitalizePipe,
        FieldSortPipe
      ],
      imports: [
        MatSelectModule,
        NoopAnimationsModule,
        FormsModule
      ],
      providers: [
        {
          provide: GenericApi,
          useValue: mockGenericApi
        },
        {
          provide: OverlayContainer, useFactory: () => {
            overlayContainerElement = document.createElement('div') as HTMLElement;
            overlayContainerElement.classList.add('cdk-overlay-container');

            document.body.appendChild(overlayContainerElement);

            // remove body padding to keep consistent cross-browser
            document.body.style.padding = '0';
            document.body.style.margin = '0';

            return { getContainerElement: () => overlayContainerElement };
          }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipGeneratorComponent);
    component = fixture.componentInstance;
    component.model =  { ...mockModel };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update model after making a selection', fakeAsync(() => {
    fixture.detectChanges();
    selectEl = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    selectEl.click();
    fixture.detectChanges();
    let option = overlayContainerElement.querySelector('mat-option') as HTMLElement;
    option.click();
    fixture.detectChanges();
    tick(500);
    expect(component.model.attributes.metaProperties.relationships[0]).toEqual('attack-pattern-1234');
  }));
});
