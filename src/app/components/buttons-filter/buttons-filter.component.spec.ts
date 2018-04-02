import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonsFilterComponent } from './buttons-filter.component';
import { FilterSearchBoxComponent } from '../filter-search-box/filter-search-box.component';

describe('ButtonsFilterComponent', () => {

    let component: ButtonsFilterComponent;
    let fixture: ComponentFixture<ButtonsFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [
                FilterSearchBoxComponent,
                ButtonsFilterComponent,
            ],
            providers: [
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonsFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit filter changes', async(() => {
        component.model = [
            {attributes: {name: 'abcdefg'}},
            {attributes: {name: 'hijklm'}},
            {attributes: {name: 'nopqrst'}},
            {attributes: {name: 'uvwxyz'}},
        ];
        component.filterItemsChange.subscribe(
            (results) => {
                expect(results).toBeDefined();
                expect(results.length).toBe(1);
                expect(results[0]).toEqual(component.model[1]);
            }
        );
        fixture.detectChanges();

        let input = fixture.debugElement.query(By.css('input#filter-search-box'));
        expect(input).not.toBeNull();
        input.nativeElement.value = component.model[1].attributes.name.substring(0, 2);
        input.nativeElement.dispatchEvent(new Event('keyup'));
        fixture.whenStable();
    }));

});
