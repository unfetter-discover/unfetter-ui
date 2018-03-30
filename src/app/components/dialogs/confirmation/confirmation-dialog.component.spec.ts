import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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
    });

    it('should handle delete button presses', async(() => {
        let input = fixture.debugElement.query(By.css('.utilityTheme button:nth-child(2)')).nativeElement;
        expect(input).not.toBeNull();
        input.click();
        fixture.whenStable().then(() => {
            expect(closeOutput).toBeTruthy();
        });
    }));

    it('should handle cancel button presses', async(() => {
        let remove = fixture.debugElement.query(By.css('.utilityTheme button:nth-child(1)')).nativeElement;
        expect(remove).not.toBeNull();
        remove.click();
        fixture.whenStable().then(() => {
            expect(closeOutput).toBeFalsy();
        });
    }));

});
