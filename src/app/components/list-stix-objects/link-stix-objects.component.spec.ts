import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { DataListModule } from 'primeng/primeng';
import { MatChipsModule, MatIconModule, MatDialog } from '@angular/material';

import { ListStixObjectComponent } from './list-stix-objects.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('ListStixObjectComponent', () => {

    let component: ListStixObjectComponent;
    let fixture: ComponentFixture<ListStixObjectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                DataListModule,
                MatChipsModule,
                MatIconModule,
            ],
            declarations: [
                ListStixObjectComponent,
            ],
            providers: [
                { provide: ActivatedRoute, useValue: {} },
                { provide: Router, useValue: {} },
                { provide: MatDialog, useValue: {} },
                { provide: Location, useValue: {} },
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListStixObjectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /**
     * @todo add Base Component tests
     * 
     * @todo lots more LinkStixObjects tests to add
     */

});
