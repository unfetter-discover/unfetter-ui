import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule } from '@angular/material';

import { AliasesComponent } from './aliases.component';

describe('AliasesComponent', () => {

    let component: AliasesComponent;
    let fixture: ComponentFixture<AliasesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                MatInputModule,
                BrowserAnimationsModule,
            ],
            declarations: [ 
                AliasesComponent,
            ],
            providers: [
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AliasesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display model data', async(() => {
        component.model = {
            attributes: {
                aliases: ['bob', 'rob', 'bobby', 'robby', 'bert']
            }
        };
        fixture.detectChanges();

        // first input should equal first alias
        let bob = fixture.debugElement.query(By.css('mat-card input.mat-input-element'));
        expect(bob).not.toBeNull();
        expect(bob.nativeElement.value).toEqual('bob');
    }));

    it('should manipulate model data', async(() => {
        component.model = {
            attributes: {
                aliases: ['bob', 'rob', 'bobby', 'robby']
            }
        };
        fixture.detectChanges();

        // try adding a new alias
        let addButton = fixture.debugElement.query(By.css('a[mat-raised-button]'));
        expect(addButton).not.toBeNull();
        addButton.nativeElement.click();
        fixture.whenStable().then(() => {
            expect(component.model.attributes.aliases.includes('  ')).toBeTruthy();

            // try editing an alias
            let editBlank = fixture.debugElement.query(By.css('mat-card input.mat-input-element'));
            expect(editBlank).not.toBeNull();
            editBlank.nativeElement.value = 'bert';
            editBlank.nativeElement.dispatchEvent(new Event('change'));
            fixture.whenStable().then(() => {
                expect(component.model.attributes.aliases.includes('  ')).toBeFalsy();
                expect(component.model.attributes.aliases.includes('bert')).toBeTruthy();

                // try deleting an alias
                let deleteBob = fixture.debugElement.query(By.css('mat-card a[mat-raised-button]'));
                expect(deleteBob).not.toBeNull();
                deleteBob.nativeElement.click();
                fixture.whenStable().then(() => {
                    expect(component.model.attributes.aliases.includes('bob')).toBeFalsy();
                });
            });
        });
    }));

});
