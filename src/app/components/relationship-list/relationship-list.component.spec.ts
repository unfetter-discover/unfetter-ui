import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { MatCardModule } from '@angular/material';

import { RelationshipListComponent } from './relationship-list.component';
import { Relationship } from '../../models';
import { BaseComponentService } from '../base-service.component';
import { GenericApi } from '../../core/services/genericapi.service';
import { Constance } from '../../utils/constance';

describe('RelationshipListComponent', () => {

    let component: RelationshipListComponent;
    let fixture: ComponentFixture<RelationshipListComponent>;
    let subscriptions: Subscription[];

    let getRelationships = (url, id) => {
        const uri = url.toString();
        if (uri.startsWith(Constance.RELATIONSHIPS_URL)) {
            return Observable.of(mockRelationships.slice(0));
        }
        const relationship = mockRelationships
            .find(rel => uri.includes(rel.attributes.source_ref) || uri.includes(rel.attributes.target_ref));
        return Observable.of({
            id: `${relationship.attributes.xtype}-id`,
            type: relationship.attributes.xtype,
            attributes: {
                name: `${relationship.attributes.xtype}-rmap`,
                pattern: `${relationship.attributes.xtype}-pattern`,
            }
        });
    };

    const mockRelationships = [
        {
            id: 'i1',
            attributes: {
                source_ref: 'indicator--a',
                target_ref: 'malware--v',
                xtype: Constance.INDICATOR_TYPE,
            }
        },
        {
            id: 'a1',
            attributes: {
                source_ref: 'attack-pattern--b',
                target_ref: 'intrusion-set--w',
                xtype: Constance.ATTACK_PATTERN_TYPE,
            }
        },
        {
            id: 'c1',
            attributes: {
                source_ref: 'campaign--c',
                target_ref: 'campaign--x',
                xtype: Constance.CAMPAIGN_TYPE,
            }
        },
        {
            id: 'i2',
            attributes: {
                source_ref: 'intrusion-set--d',
                target_ref: 'attack-pattern--y',
                xtype: Constance.INTRUSION_SET_TYPE,
            },
        },
        {
            id: 'm1',
            attributes: {
                source_ref: 'malware--e',
                target_ref: 'indicator--z',
                xtype: Constance.MALWARE_TYPE,
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
            ],
            declarations: [
                RelationshipListComponent,
            ],
            providers: [
                GenericApi,
                BaseComponentService,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RelationshipListComponent);
        component = fixture.componentInstance;
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
    });

    it('should load relationships',
            fakeAsync(inject([BaseComponentService, GenericApi], (service: BaseComponentService, api: GenericApi) => {
        spyOn(service, 'get').and.callFake(getRelationships);
        component.loadRelationships({'stix.target_ref': 'test'});

        // check the components were created
        fixture.detectChanges();
        let mappings = fixture.debugElement.queryAll(By.css('mat-card h5 a'));
        expect(mappings).not.toBeNull();
        expect(mappings.length).toBe(mockRelationships.length);

        // test that getUrl works correctly
        let rand = Math.floor(Math.random() * mockRelationships.length);
        const href = mappings[rand].nativeElement.getAttribute('href');
        expect(href.includes(component.getUrl(component.relationshipMapping[rand].id))).toBeTruthy();
        expect(href.includes(component.relationshipMapping[rand].id)).toBeTruthy();

        // test that getName works correctly
        expect(mappings[rand].nativeElement.textContent.trim())
            .toEqual(component.getName(component.relationshipMapping[rand]));

        // test that getIcon works correctly
        const icon = mappings[rand].query(By.css('img'));
        expect(icon).not.toBeNull();
        expect(icon.nativeElement.getAttribute('src')).toEqual(component.getIcon(component.relationshipMapping[rand]));

        // do it again, for coverage testing
        component.loadRelationships({'stix.source_ref': 'test'});
    })));

    it('should save relationships',
            fakeAsync(inject([BaseComponentService, GenericApi], (service: BaseComponentService, api: GenericApi) => {
        spyOn(service, 'get').and.callFake(getRelationships);
        spyOn(service, 'save').and.returnValue(Observable.of({}));
        component.loadRelationships({'stix.target_ref': 'test'});
        component.saveRelationships(new Relationship());
        expect(component.relationships.length).toBe(6);
    })));

    it('should delete relationships',
            fakeAsync(inject([BaseComponentService, GenericApi], (service: BaseComponentService, api: GenericApi) => {
        spyOn(service, 'get').and.callFake(getRelationships);
        spyOn(service, 'delete').and.returnValue(Observable.of({}));
        component.loadRelationships({'stix.source_ref': 'test'});
        let rand = Math.floor(Math.random() * mockRelationships.length);
        component.deleteRelationships(mockRelationships[rand].attributes.source_ref);
        expect(component.relationships.length).toBe(1);
        expect(component.relationships[0].id).toEqual(mockRelationships[rand].id);
    })));

    /**
     * @todo to test gotoDetail, we need to spy on routing...
     * 
     * @todo test detecting changes...
     */

});
