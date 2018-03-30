import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { makeMockIndicatorSharingStore } from '../../testing/mock-store';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { IndicatorSharingListComponent } from './indicator-sharing-list.component';
import { MatButtonModule, MatSidenavModule, MatDialogModule } from '@angular/material';

describe('IndicatorSharingListComponent', () => {
    let component: IndicatorSharingListComponent;
    let fixture: ComponentFixture<IndicatorSharingListComponent>;

    let store;

    let mockReducer: ActionReducerMap<any> = {
        indicatorSharing: indicatorSharingReducer
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                IndicatorSharingListComponent
            ],
            imports: [
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
        makeMockIndicatorSharingStore(store);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
