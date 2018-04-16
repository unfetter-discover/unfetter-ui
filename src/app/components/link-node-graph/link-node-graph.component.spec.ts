import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LinkNodeGraphComponent } from './link-node-graph.component';

describe('LinkNodeGraphComponent', () => {

    let component: LinkNodeGraphComponent;
    let fixture: ComponentFixture<LinkNodeGraphComponent>;

    const mockModel = {
        nodes: [
            { id: 'A', classNames: 'tool', radius: 30, collideRadius: '100' },
            { id: 'B', classNames: 'tool', radius: 40, collideRadius: '100' },
            { id: 'C', classNames: 'tool', radius: 30, collideRadius: '100' },
            { id: 'D', classNames: 'tool', radius: 60, collideRadius: '100' },
            { id: 'E', classNames: 'tool', radius: 20, collideRadius: '100' },
        ],
        links: [
            { id: 'ab', source: 'A', target: 'B' },
            { id: 'ac', source: 'A', target: 'C' },
            { id: 'bc', source: 'B', target: 'C' },
            { id: 'bd', source: 'B', target: 'D' },
            { id: 'be', source: 'B', target: 'E' },
            { id: 'cd', source: 'C', target: 'D' },
            { id: 'de', source: 'D', target: 'E' },
        ],
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [
                LinkNodeGraphComponent,
            ],
            providers: [
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LinkNodeGraphComponent);
        component = fixture.componentInstance;
        component.config = mockModel;
        component.forcesEnabled = {};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
