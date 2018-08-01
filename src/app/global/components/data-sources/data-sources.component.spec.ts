import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourcesComponent } from './data-sources.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, AppState } from '../../../root-store/app.reducers';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { makeRootMockStore, mockConfig } from '../../../testing/mock-store';
import { take } from 'rxjs/operators';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DataSourcesComponent', () => {
  let component: DataSourcesComponent;
  let fixture: ComponentFixture<DataSourcesComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DataSourcesComponent 
      ],
      imports: [
        StoreModule.forRoot(reducers)
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourcesComponent);
    component = fixture.componentInstance;
    component.formCtrl = new FormControl([]);
    store = component.store;
    makeRootMockStore(store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have populated data sources', (done) => {
    component.dataSources$
      .pipe(take(1))
      .subscribe(
        (dataSources) => {          
          expect(dataSources).toBeTruthy();
          expect(dataSources.length).toBe(mockConfig.dataSources.length);
          done();
        },
        (err) => {
          console.log(err);
        }
      );
  });
});
