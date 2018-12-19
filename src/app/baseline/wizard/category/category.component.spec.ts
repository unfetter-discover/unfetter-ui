import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule
} from '@angular/material';

import { CategoryComponent } from './category.component';
import { FieldSortPipe } from '../../../global/pipes/field-sort.pipe';
import { AppState } from '../../../root-store/app.reducers';
import { baselineReducer } from '../../store/baseline.reducers';
import {
    SetAndReadCapabilities,
    SetBaselineGroups,
    SetCapabilities,
    SetCapabilityGroups,
} from '../../store/baseline.actions';
import { Category } from 'stix';

describe('CategoryComponent', () => {

    let fixture: ComponentFixture<CategoryComponent>;
    let component: CategoryComponent;

    beforeEach(async(() => {
        let mockReducer: ActionReducerMap<any> = {
            baseline: baselineReducer,
        };

        TestBed
            .configureTestingModule({
                imports: [
                    FormsModule,
                    RouterTestingModule,
                    NoopAnimationsModule,
                    MatButtonModule,
                    MatCardModule,
                    MatIconModule,
                    MatSelectModule,
                    StoreModule.forRoot(mockReducer),
                ],
                declarations: [
                    CategoryComponent,
                    FieldSortPipe,
                ],
                // schemas: [NO_ERRORS_SCHEMA]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
