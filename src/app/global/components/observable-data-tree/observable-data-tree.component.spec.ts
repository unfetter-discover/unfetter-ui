import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { StoreModule, ActionReducerMap, Store } from '@ngrx/store';

import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material';

import { ObservableDataTreeComponent } from './observable-data-tree.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { configReducer } from '../../../root-store/config/config.reducers';
import { mockConfig, makeRootMockStore } from '../../../testing/mock-store';

describe('ObservableDataTreeComponent', () => {

    let fixture: ComponentFixture<ObservableDataTreeComponent>;
    let component: ObservableDataTreeComponent;
    let store: Store<any>;

    let mockReducer: ActionReducerMap<any> = {
        config: configReducer
    };
    mockConfig['observableDataTypes'] = [
        { name: 'test-1', action: 'Stop', actions: ['shut', 'down'], property: 'stop', properties: ['dead'], },
        { name: 'test-2', action: 'Look', actions: [], property: 'observe', properties: [], },
        { name: 'test-3', action: 'Listen', actions: [], property: 'listen', properties: [], },
    ];

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [ 
                    ObservableDataTreeComponent,
                    CapitalizePipe,
                ],
                imports: [
                    FormsModule,
                    MatCheckboxModule,
                    StoreModule.forRoot(mockReducer),
                ],
                providers: [
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObservableDataTreeComponent);
        component = fixture.componentInstance;
        component.observedDataPath = [];
        store = component['store'];
        makeRootMockStore(store);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
