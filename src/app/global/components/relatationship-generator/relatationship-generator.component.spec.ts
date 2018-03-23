import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSelectModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { RelatationshipGeneratorComponent } from './relatationship-generator.component';
import { GenericApi } from '../../../core/services/genericapi.service';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { FieldSortPipe } from '../../pipes/field-sort.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('RelatationshipGeneratorComponent', () => {
  let component: RelatationshipGeneratorComponent;
  let fixture: ComponentFixture<RelatationshipGeneratorComponent>;

  const mockModel = {
    attributes: {
      metaProperties: {
        relationships: []
      }
    }
  };

  const mockGenericApi = {
    get(url: string): Observable<any> {
      return Observable.of([
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
        RelatationshipGeneratorComponent,
        CapitalizePipe,
        FieldSortPipe
      ],
      imports: [
        MatSelectModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: GenericApi,
          useValue: mockGenericApi
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatationshipGeneratorComponent);
    component = fixture.componentInstance;
    component.model =  { ...mockModel };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
