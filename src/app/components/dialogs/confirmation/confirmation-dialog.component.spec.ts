import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {

    let component: ConfirmationDialogComponent;
    let fixture: ComponentFixture<ConfirmationDialogComponent>;
    let closeOutput: boolean;

    const mockData = {
        type: 'RelationShips',
        attributes: {
            name: 'Confirmation Test',
            relationship_type: 'Relation Ship'
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
            ],
            declarations: [
                ConfirmationDialogComponent,
            ],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: mockData
                },
                {
                    provide: MatDialogRef,
                    useValue: {
                        close: (output) => closeOutput = output
                    }
                },
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmationDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();

        // for coverage
        mockData.type = 'UnrelationShips';
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should handle delete button presses', async(() => {
        let input = fixture.debugElement.query(By.css('.utilityTheme button:nth-child(2)'));
        expect(input).not.toBeNull();
        input.nativeElement.click();
        fixture.whenStable().then(() => {
            expect(closeOutput).toBeTruthy();
        });
    }));

    it('should handle cancel button presses', async(() => {
        let remove = fixture.debugElement.query(By.css('.utilityTheme button:nth-child(1)'));
        expect(remove).not.toBeNull();
        remove.nativeElement.click();
        fixture.whenStable().then(() => {
            expect(closeOutput).toBeFalsy();
        });
    }));

});
