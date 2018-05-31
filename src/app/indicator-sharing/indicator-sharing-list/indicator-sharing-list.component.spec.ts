import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatButtonModule, MatDialogModule, MatSidenavModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { makeMockIndicatorSharingStore, makeRootMockStore } from '../../testing/mock-store';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
import { IndicatorSharingListComponent } from './indicator-sharing-list.component';
import { usersReducer } from '../../root-store/users/users.reducers';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IndicatorSharingService } from '../indicator-sharing.service';
import { Observable } from 'rxjs/Observable';

describe('IndicatorSharingListComponent', () => {
    let component: IndicatorSharingListComponent;
    let fixture: ComponentFixture<IndicatorSharingListComponent>;

    let store;

    const mockReducer: ActionReducerMap<any> = {
        users: usersReducer,
        indicatorSharing: indicatorSharingReducer
    };

    const mockIndicatorSharingService = {
        getDownloadData: (p1, p2, p3) => {
            return Observable.of([]);
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                IndicatorSharingListComponent
            ],
            imports: [
                NoopAnimationsModule,
                MatButtonModule,
                MatSidenavModule,
                MatDialogModule,
                RouterTestingModule,
                StoreModule.forRoot(mockReducer)
            ],
            providers: [
                {
                    provide: IndicatorSharingService,
                    useValue: mockIndicatorSharingService
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndicatorSharingListComponent);
        component = fixture.componentInstance;
        store = component.store;
        makeRootMockStore(store);
        makeMockIndicatorSharingStore(store);
        // to prevent downloading
        spyOn(component, 'downloadResults').and.returnValue(true);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
