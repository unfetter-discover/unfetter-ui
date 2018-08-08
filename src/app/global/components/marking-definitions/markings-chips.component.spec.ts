import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import { MatChipsModule, MatTooltipModule } from '@angular/material';

import { MarkingDefinition } from 'stix';
import { MarkingsChipsComponent } from './markings-chips.component';
import { reducers, AppState } from '../../../root-store/app.reducers';
import * as stixActions from '../../../root-store/stix/stix.actions';
import { StixCoreEnum } from 'stix';

describe('MarkingsChipsComponent', () => {

    let fixture: ComponentFixture<MarkingsChipsComponent>;
    let component: MarkingsChipsComponent;
    let store: Store<AppState>;

    const markings = [
        {
            id: 'mdr-1',
            type: StixCoreEnum.MARKING_DEFINITION,
            created: new Date(),
            created_by_ref: null,
            description: null,
            definition_type: 'rating',
            definition: {
                rating: 1,
                label: 'WEAK'
            }
        } as any,
        {
            id: 'mdr-10',
            type: StixCoreEnum.MARKING_DEFINITION,
            created: new Date(),
            created_by_ref: null,
            description: null,
            definition_type: 'rating',
            definition: {
                rating: 10,
                label: 'STRONG'
            }
        } as any,
    ];

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    MatChipsModule,
                    MatTooltipModule,
                    StoreModule.forRoot(reducers)
                ],
                declarations: [
                    MarkingsChipsComponent
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarkingsChipsComponent);
        component = fixture.componentInstance;
        store = component['store'];
        store.dispatch(new stixActions.SetMarkingDefinitions(markings));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
