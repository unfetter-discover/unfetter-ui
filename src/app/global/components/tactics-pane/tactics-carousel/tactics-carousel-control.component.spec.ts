import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';

import {
    MatButtonToggleModule,
    MatButtonToggleChange,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    MatSelectChange,
} from '@angular/material';

import { TacticsCarouselControlComponent } from './tactics-carousel-control.component';
import { TacticsControlService } from '../tactics-control.service';

fdescribe('TacticCarouselControlComponent', () => {

    let fixture: ComponentFixture<TacticsCarouselControlComponent>;
    let component: TacticsCarouselControlComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    MatButtonToggleModule,
                    MatIconModule,
                    MatOptionModule,
                    MatSelectModule,
                    MatToolbarModule,
                ],
                declarations: [TacticsCarouselControlComponent],
                providers: [TacticsControlService],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TacticsCarouselControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle page control events', fakeAsync(() => {
        component['controls'].state.pager = {page: 0, totalPages: 3};
        component['controls'].change.emit({pager: component['controls'].state.pager});
        tick(250);
        expect(component.pages).toEqual(3);
        expect(component.pagelist.length).toEqual(3);

        expect(component.page).toEqual(0);

        component.onPageChange({value: 2} as MatSelectChange);
        expect(component.page).toEqual(2);

        component.goPreviousPage();
        tick(250);
        expect(component.page).toEqual(1);

        component.goNextPage();
        tick(250);
        expect(component.page).toEqual(2);
    }));

    it('should fire filter change events', fakeAsync(() => {
        component['controls'].state.filters = {rows: false, columns: false};
        const spy = spyOn(component['controls'].change, 'emit').and.callThrough();
        ['rows', 'columns'].forEach((toggle, index) => {
            component.onFilterChange({value: toggle} as MatButtonToggleChange);
            tick(250);
            expect(component.filters[toggle]).toBeTruthy();
            expect(spy).toHaveBeenCalledTimes(index + 1);
        });
    }));

});
