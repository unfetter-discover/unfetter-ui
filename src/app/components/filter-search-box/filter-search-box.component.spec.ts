import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSearchBoxComponent } from './filter-search-box.component';
import { By } from '@angular/platform-browser';

describe('FilterSearchBoxComponent', () => {

    let component: FilterSearchBoxComponent;
    let fixture: ComponentFixture<FilterSearchBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [
                FilterSearchBoxComponent,
            ],
            providers: [
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterSearchBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should filter on items', async(() => {
        component.items = [
            {attributes: {name: 'abcde', desc: 'fuv'}},
            {attributes: {name: 'fghij', desc: 'fwx'}},
            {attributes: {name: 'klmno', desc: {id: 'fyz', article: 'fgh'}}},
            {attributes: {name: 'pqrst', desc: ['fgh']}},
        ];
        component.filterItemsChange.subscribe(
            (results) => {
                expect(results).toBeDefined();
                expect(results.length).toBe(3);
                expect(results[0]).toEqual(component.items[1]);
                expect(results[1]).toEqual(component.items[2]);
                expect(results[2]).toEqual(component.items[3]);
            }
        );
        fixture.detectChanges();

        let input = fixture.debugElement.query(By.css('input#filter-search-box')).nativeElement;
        expect(input).not.toBeNull();
        input.value = component.items[1].attributes.name.substring(0, 2);
        input.dispatchEvent(new Event('keyup'));
        fixture.whenStable();
    }));

});
