import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { ObservableDataSummaryComponent } from './observable-data-summary.component';

describe('ObservableDataSummaryComponent', () => {

    let fixture: ComponentFixture<ObservableDataSummaryComponent>;
    let component: ObservableDataSummaryComponent;

    const mockData = [
        {
            name: 'test-1',
            action: 'Ready',
            property: 'arms',
        },
        {
            name: 'test-2',
            action: 'Aim',
            property: 'scope',
        },
        {
            name: 'test-3',
            action: 'Fire',
            property: 'target',
        },
    ];
    const mockObserved = [
        mockData[1],
        {
            name: 'test-4',
            action: 'Misfire',
            property: 'oops'
        },
        mockData[1],
        {
            name: 'test-4',
            action: 'Dud',
            property: 'so-oops'
        },
    ];

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [ 
                    ObservableDataSummaryComponent,
                ],
                imports: [
                ],
                providers: [
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObservableDataSummaryComponent);
        component = fixture.componentInstance;
        component.observedData = mockData;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should map observed', () => {
        const mapped = component.mapObservedData(mockObserved);
        expect(mapped.length).toBe(2);
    });

});
