import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';

import { MatChipsModule, MatTooltipModule } from '@angular/material';

import { MarkingDefinition, StixCoreEnum } from 'stix';
import { MarkingsChipsComponent } from './markings-chips.component';
import { reducers, AppState } from '../../../root-store/app.reducers';
import * as stixActions from '../../../root-store/stix/stix.actions';

describe('MarkingsChipsComponent', () => {

    let fixture: ComponentFixture<MarkingsChipsComponent>;
    let component: MarkingsChipsComponent;
    let store: Store<AppState>;

    const markings = [
        {
            id: 'mdr--tlp-red',
            type: StixCoreEnum.MARKING_DEFINITION,
            created: new Date(),
            definition_type: 'tlp',
            definition: {
                tlp: 'red'
            }
        } as any,
        {
            id: 'mdr--tlp-white',
            type: StixCoreEnum.MARKING_DEFINITION,
            created: new Date(),
            definition_type: 'tlp',
            definition: {
                tlp: 'white'
            }
        } as any,
        {
            id: 'mdr--statement-unmarked',
            type: StixCoreEnum.MARKING_DEFINITION,
            created: new Date(),
            definition_type: 'statement',
            definition: {
                statement: 'Unmarked'
            }
        } as any,
        {
            id: 'mdr--statement-marked',
            type: StixCoreEnum.MARKING_DEFINITION,
            created: new Date(),
            definition_type: 'statement',
            definition: {
                statement: 'Marked'
            }
        } as any,
        {
            id: 'mdr--capco-class',
            type: StixCoreEnum.MARKING_DEFINITION,
            created: new Date(),
            definition_type: 'capco',
            definition: {
                category: 'Classification',
                text: 'Important',
                portion: 'I'
            }
        } as any,
        {
            id: 'mdr--capco-dissem-1',
            type: StixCoreEnum.MARKING_DEFINITION,
            created: new Date(),
            definition_type: 'capco',
            definition: {
                category: 'Dissemination',
                precedence: 1,
                text: 'Only Me',
                portion: 'Me'
            }
        } as any,
        {
            id: 'mdr--capco-dissem-2',
            type: StixCoreEnum.MARKING_DEFINITION,
            created: new Date(),
            definition_type: 'capco',
            definition: {
                category: 'Dissemination',
                precedence: 2,
                text: 'Public',
                portion: 'PUB'
            }
        } as any,
    ];

    const model = {
        object_marking_refs: []
    };

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
        component.model = model;
        store = component['store'];
        store.dispatch(new stixActions.SetMarkingDefinitions([...markings]));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display TLP values', () => {
        component.model = { object_marking_refs: [markings[0].id] };
        component.ngOnChanges({
            model: new SimpleChange(model, component.model, false)
        })
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.markings.length).toBe(1);
            expect(component.markings[0].text).toEqual(`TLP: ${markings[0].definition.tlp}`);
        });
    });

    it('should display statement values', () => {
        component.model = { object_marking_refs: [markings[2].id] };
        component.ngOnChanges({
            model: new SimpleChange(model, component.model, false)
        })
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.markings.length).toBe(1);
            expect(component.markings[0].text).toEqual(markings[2].definition.statement);
        });
    });

    it('should display CAPCO values', () => {
        component.model = { object_marking_refs: markings.slice(-3).map(m => m.id) };
        component.ngOnChanges({
            model: new SimpleChange(model, component.model, false)
        })
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.markings.length).toBe(1);
            expect(component.markings[0].texts.length).toBe(2);
            expect(component.markings[0].portion).toEqual('I//Me/PUB');
        });
    });

});
