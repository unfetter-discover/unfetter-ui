import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule, MatTooltipModule } from '@angular/material';

import { ChipLinksComponent } from './chip-links.component';
import { By } from '@angular/platform-browser';

describe('ChipLinksComponent', () => {

    let fixture: ComponentFixture<ChipLinksComponent>;
    let component: ChipLinksComponent;

    const routes: Routes = [
        { path: '.', component: ChipLinksComponent },
    ];
    const mockRouter = {
        navigate: (paths: string[]) => {},
    }

    const mockData = [
        {name: 'A', url: 'a'},
        {name: 'B', url: 'b'},
        {name: 'C', url: 'c'},
        {name: 'D', url: 'd'},
    ];

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    RouterTestingModule.withRoutes(routes),
                    MatChipsModule,
                    MatTooltipModule,
                ],
                declarations: [
                    ChipLinksComponent,
                ],
                providers: [
                    { provide: ActivatedRoute, useValue: {} },
                    { provide: Router, useValue: mockRouter },
                    { provide: Location, useValue: { back: () => {} } },
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChipLinksComponent);
        component = fixture.componentInstance;
        component.maxChips = 2;
        component.nameField = 'name';
        component.urlField = 'url';
        component.data = mockData;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should try to navigate on chip click', () => {
        const spy = spyOn(window, 'open').and.callFake(() => {});
        const aChip = fixture.nativeElement.querySelector('mat-chip');
        expect(aChip).not.toBeNull();
        aChip.dispatchEvent(new Event('click'));
        expect(spy).toHaveBeenCalled();
    });

});
