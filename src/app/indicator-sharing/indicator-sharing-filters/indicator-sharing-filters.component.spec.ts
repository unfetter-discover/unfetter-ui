import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatCardModule, MatSelectModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActionReducerMap, StoreModule } from '@ngrx/store';


import { IndicatorSharingFiltersComponent } from './indicator-sharing-filters.component';
import { indicatorSharingReducer } from '../store/indicator-sharing.reducers';
import { makeMockIndicatorSharingStore, makeRootMockStore } from '../../testing/mock-store';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';
import { FieldSortPipe } from '../../global/pipes/field-sort.pipe';
import { configReducer } from '../../root-store/config/config.reducers';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';

describe('IndicatorSharingFiltersComponent', () => {
    let overlayContainerElement: HTMLElement;
    let component: IndicatorSharingFiltersComponent;
    let fixture: ComponentFixture<IndicatorSharingFiltersComponent>;
    let store;

    let mockReducer: ActionReducerMap<any> = {
        config: configReducer,
        indicatorSharing: indicatorSharingReducer
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                IndicatorSharingFiltersComponent,
                CapitalizePipe,
                FieldSortPipe
            ],
            imports: [
                MatCardModule,
                MatSelectModule,
                MatInputModule,
                ReactiveFormsModule,
                FormsModule,
                NoopAnimationsModule,
                StoreModule.forRoot(mockReducer)
            ],
            providers: [
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
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndicatorSharingFiltersComponent);
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
