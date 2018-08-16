import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of as observableOf } from 'rxjs';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTabsModule,
    MatInputModule,
    MatTableDataSource,
} from '@angular/material';

import { MasterListDialogComponent, MasterListDialogTableHeaders } from './master-list-dialog.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

describe('MasterListDialogComponent', () => {

    let fixture: ComponentFixture<MasterListDialogComponent>;
    let component: MasterListDialogComponent;

    const mockDialog = {
        close: () => { },
    };
    const mockData = {
        title: 'Master List Dialog Test',
        columns: new MasterListDialogTableHeaders(),
        datasource: new MatTableDataSource([
            { id: 'item--1', edition: new Date(), desc: 'Thing 1' },
            { id: 'item--2', edition: new Date(), desc: 'Thing 2' },
            { id: 'item--3', edition: new Date(), desc: 'Thing 3' },
            { id: 'item--4', edition: new Date(), desc: 'Thing 4' },
        ]),
    };

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    NoopAnimationsModule,
                    MatDialogModule,
                    MatFormFieldModule,
                    MatIconModule,
                    MatInputModule,
                    MatProgressSpinnerModule,
                    MatTableModule,
                    MatTabsModule,
                ],
                declarations: [
                    MasterListDialogComponent,
                    LoadingSpinnerComponent,
                ],
                providers: [
                    {
                        provide: MAT_DIALOG_DATA,
                        useValue: mockData
                    },
                    {
                        provide: MatDialogRef,
                        useValue: {
                            close: function() {}
                        }
                    },
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MasterListDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should allow for more columns', () => {
        component.data.columns.addColumn('desc', 'Description');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
        });
    });

});
