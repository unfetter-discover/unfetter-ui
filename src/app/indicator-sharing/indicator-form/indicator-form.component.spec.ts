
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { MatButtonModule } from '@angular/material';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { FieldSortPipe } from '../../global/pipes/field-sort.pipe';
import { IndicatorSharingService } from '../indicator-sharing.service';
import { AuthService } from '../../core/services/auth.service';
import { GenericApi } from '../../core/services/genericapi.service';
import * as fromRoot from '../../root-store/app.reducers';

import { IndicatorFormComponent } from './indicator-form.component';
import { usersReducer } from '../../root-store/users/users.reducers';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
import { stixReducer } from '../../root-store/stix/stix.reducers';
import { makeMockIndicatorSharingStore } from '../../testing/mock-store';

xdescribe('IndicatorFormComponent', () => {
  let component: IndicatorFormComponent;
  let fixture: ComponentFixture<IndicatorFormComponent>;

  const mockReducer: ActionReducerMap<any> = {
    ...fromRoot.reducers,
    indicatorSharing: indicatorSharingReducer
  };

  const mockIndService = {
    getIdentities: () => {
      return observableOf([
        {
          attributes: {
            id: 'identity-1234',
            name: 'test org'
          }
        }
      ]);
    },
    getUserProfileById: (userId) => {
      return observableOf({
        attributes: {
          organizations: [
            {
              approved: true,
              id: 'identity-1234',
              role: 'STANDARD_USER'
            }
          ]
        }
      });
    },
    translateAllPatterns: (pattern) => {
      return observableOf({
        attributes: {
          'car-elastic': 'test',
          'car-splunk': 'test',
          'cim-elastic': 'test',
          pattern,
          validated: true
        }
      });
    },
    patternHandlerObjects: (pattern) => {
      return observableOf({
        attributes: {
          object: [
            {
              name: 'process',
              property: 'pid'
            }
          ],
          pattern,
          validated: true
        }
      });
    },
    addIndicator: (indicator) => {
      return observableOf({
        attributes: indicator
      });
    }
  };

  const mockAuthService = {
    getUser: () => {
      return {
        _id: '1234'
      };
    }
  };

  const mockGenericApi = {
    uploadAttachments: (files, cb) => {
      return observableOf([
        {
          _id: '1234',
          filename: 'bob.txt'
        }
      ]);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IndicatorFormComponent,
        CapitalizePipe,
        FieldSortPipe
      ],
      imports: [
        MatButtonModule,
        RouterTestingModule,
        StoreModule.forRoot(mockReducer)
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: IndicatorSharingService,
          useValue: mockIndService
        },
        {
          provide: AuthService,
          useValue: mockAuthService
        },
        {
          provide: GenericApi,
          useValue: mockGenericApi
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorFormComponent);
    component = fixture.componentInstance;
    const store = component.store;
    makeMockIndicatorSharingStore(store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pattern translate and get objects', (done) => {
    component.form.get('pattern').setValue('testpattern');
    // NOTE this is a hack to be sure the subcribe block is actually called
    component.patternObjSubject
      .pipe(take(1))
      .subscribe((_) => {
        expect(component.patternObjs[0].name).toBe('process');
        expect(component.patternObjs[0].property).toBe('pid');
        expect(component.showPatternTranslations).toBeTruthy();
        done();
      });
  });
});
