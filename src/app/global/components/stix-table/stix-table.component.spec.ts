import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatChipsModule, MatTooltipModule } from '@angular/material';

import { StixTableComponent } from './stix-table.component';
import { ChipLinksComponent } from '../chip-links/chip-links.component';

describe('StixTableComponent', () => {

    let fixture: ComponentFixture<StixTableComponent>;
    let component: StixTableComponent;

    const mockData = [
        { attributes: { id: 'ap--1', type: 'attack-pattern', name: 'ATTACK!!!' } },
    ];

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    NoopAnimationsModule,
                    RouterTestingModule,
                    MatTableModule,
                    MatPaginatorModule,
                    MatChipsModule,
                    MatTooltipModule,
                ],
                declarations: [
                    StixTableComponent,
                    ChipLinksComponent,
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StixTableComponent);
        component = fixture.componentInstance;
        component.stixData = mockData;
        component.dataSource = undefined;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit deletes', () => {
        const spy = spyOn(component.delete, 'emit').and.callFake(() => {});
        const del = fixture.nativeElement.querySelector('.buttonGrp button:last-child');
        expect(del).toBeTruthy();
        del.dispatchEvent(new Event('click'));
        expect(spy).toHaveBeenCalled();
    });

});
