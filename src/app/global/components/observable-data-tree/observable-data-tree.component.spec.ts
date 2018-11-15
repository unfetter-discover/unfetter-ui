import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { StoreModule, ActionReducerMap, Store } from '@ngrx/store';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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

    mockConfig['observableDataTypes'] = [
        { name: 'test-1', action: 'Stop', actions: ['shut', 'open'], property: 'stop', properties: ['down'], },
        { name: 'test-2', action: 'Look', actions: [], property: 'observe', properties: [], },
        { name: 'test-3', action: 'Listen', actions: [], property: 'listen', properties: [], },
    ];
    let mockReducer: ActionReducerMap<any> = {
        config: configReducer
    };

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
                    NoopAnimationsModule,
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
        store = component['store'];
        makeRootMockStore(store);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle actions', () => {
        // first, drill down into the first data item's actions
        const expander: Element = fixture.nativeElement.querySelector(
                'div.obsDataTreeComponent > div > div:nth-child(1) > div');
        expander.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const expander2: Element = fixture.nativeElement.querySelector(
                    'div.obsDataTreeComponent > div > div:nth-child(1) div.treePaddingLeft > div > div');
            expander2.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const spy = spyOn(console, 'log');
                const checkbox: Element = fixture.nativeElement.querySelector(
                        'div.obsDataTreeComponent > div > div:nth-child(1) div.treePaddingLeft input');
                checkbox.dispatchEvent(new Event('click'));
                fixture.detectChanges();
                expect(spy).toHaveBeenCalledWith(
                        'There is nothing to add observable data to, please use a component input');
            });
        });
    });

});
