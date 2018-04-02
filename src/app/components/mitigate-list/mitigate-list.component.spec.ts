import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { MatCardModule, MatCheckboxModule } from '@angular/material';

import { MitigateListComponent } from './mitigate-list.component';
import { RelationshipListComponent } from '../relationship-list/relationship-list.component';
import { PageHeaderComponent } from '../page/page-header.component';
import { BaseComponentService } from '../base-service.component';
import { GenericApi } from '../../core/services/genericapi.service';
import { Constance } from '../../utils/constance';
import { Relationship, AttackPattern } from '../../models';

describe('MitigateListComponent', () => {

    let component: MitigateListComponent;
    let fixture: ComponentFixture<MitigateListComponent>;
    let subscriptions: Subscription[];

    let getRelationships = (url, id) => {
        const uri = url.toString();
        if (uri.startsWith(Constance.RELATIONSHIPS_URL)) {
            return Observable.of(mockRelationships.slice(0));
        }
        const relationship = mockRelationships
            .find(rel => uri.includes(rel.attributes.source_ref) || uri.includes(rel.attributes.target_ref));
        return Observable.of(new Relationship({
            id: 'attack-pattern--1',
            type: Constance.INDICATOR_TYPE,
            attributes: {
                name: 'ap-relationship',
                pattern: 'ap[12]',
                source_ref: 'attack-pattern--1',
                target_ref: 'attack-pattern--x',
            }
        }));
    };

    const mockRelationships = [
        {
            id: 'attack-pattern--1',
            attributes: {
                source_ref: 'attack-pattern--1',
                target_ref: 'attack-pattern--x',
            }
        },
    ];

    beforeEach(async(() => {
        subscriptions = [];

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                HttpClientTestingModule,
                MatCardModule,
                MatCheckboxModule,
            ],
            declarations: [
                PageHeaderComponent,
                RelationshipListComponent,
                MitigateListComponent,
            ],
            providers: [
                GenericApi,
                {
                    provide: BaseComponentService,
                    useValue: {
                        get: getRelationships,
                        save: () => Observable.of({}),
                        delete: () => Observable.of({}),
                    }
                },
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MitigateListComponent);
        component = fixture.componentInstance;
        component.title = 'Test';
        component.description = 'This is a test. This is only a test.';
        component.model = { attributes: { name: 'Still a test' }};
        component.source = [
            { id: 'attack-pattern--1', attributes: { name: 'Attack-Pattern-1', kill_chain_phases: ['Phase1'] } },
            { id: 'attack-pattern--2', attributes: { name: 'Attack-Pattern-2', kill_chain_phases: ['Phase2'] } },
            { id: 'attack-pattern--3', attributes: { name: 'Attack-Pattern-3', kill_chain_phases: ['Phase3'] } },
            { id: 'attack-pattern--x', attributes: { name: 'Test-X' } },
        ];
        fixture.detectChanges();
    });

    afterEach(() => {
        if (subscriptions) {
            subscriptions
                .filter((sub) => sub !== undefined)
                .filter((sub) => !sub.closed)
                .forEach((sub) => sub.unsubscribe());
        }
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        const boxes = fixture.debugElement.queryAll(By.css('mat-checkbox'));
        expect(boxes).not.toBeNull();
        expect(boxes.length).toBe(4);
    });

    it('should update attack patterns', () => {
        // add one
        component.update(new AttackPattern({ id: 'attack-pattern--test', attributes: {} } as AttackPattern));
        expect(component.relationships.length).toBe(2);

        // delete one
        component.relationships.splice(1, 1);
        component.update({ id: 'attack-pattern--1' } as AttackPattern);
        // expect(component.relationshipMapping.length).toBe(0);
    });

});
