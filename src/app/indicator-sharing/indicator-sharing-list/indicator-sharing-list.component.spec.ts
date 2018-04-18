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


describe('IndicatorSharingListComponent', () => {
    let component: IndicatorSharingListComponent;
    let fixture: ComponentFixture<IndicatorSharingListComponent>;

    let store;

    let mockReducer: ActionReducerMap<any> = {
        users: usersReducer,
        indicatorSharing: indicatorSharingReducer
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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
