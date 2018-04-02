import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StixTextArrayComponent } from './stix-text-array.component';
import { CapitalizePipe } from '../../global/pipes/capitalize.pipe';

describe('StixTextArrayComponent', () => {

    let component: StixTextArrayComponent;
    let fixture: ComponentFixture<StixTextArrayComponent>;

    const mockModel = {
        attributes: {
            source: [ 'Gaggle', 'Yeeha', 'Twits', 'Pantera', ],
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MatCardModule,
                MatInputModule,
                BrowserAnimationsModule,
            ],
            declarations: [
                CapitalizePipe,
                StixTextArrayComponent,
            ],
            providers: [
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StixTextArrayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display model data', async(() => {
        component.propertyName = 'source';
        component.model = Object.assign({}, mockModel);
        fixture.detectChanges();

        // count all the cards
        let cards = fixture.debugElement.queryAll(By.css('mat-card'));
        expect(cards).not.toBeNull();
        expect(cards.length).toEqual(component.model.attributes.source.length);
    }));

    it('should add new model data', async(() => {
        component.propertyName = 'source';
        component.model = Object.assign({}, mockModel);
        const count = component.model.attributes.source.length;
        fixture.detectChanges();

        // try adding new data
        let add = fixture.debugElement.query(By.css('a[mat-raised-button]')); // first button is the add button
        expect(add).not.toBeNull();
        add.nativeElement.click();
        fixture.detectChanges();
        expect(component.model.attributes.source.length).toEqual(count + 1);
        expect(component.model.attributes.source.includes('')).toBeTruthy();
        let cards = fixture.debugElement.queryAll(By.css('mat-card'));
        expect(cards.length).toEqual(count + 1);
    }));

    it('should handle removing model data', async(() => {
        component.propertyName = 'source';
        component.model = Object.assign({}, mockModel);
        const count = component.model.attributes.source.length;
        fixture.detectChanges();

        // try removing a random card
        let cards = fixture.debugElement.queryAll(By.css('mat-card'));
        let rand = Math.floor(Math.random() * count);
        let remove = cards[rand].query(By.css('a[mat-raised-button]'));
        expect(remove).not.toBeNull();
        remove.nativeElement.click();
        fixture.whenStable().then(() => {
            expect(component.model.attributes.source.length).toEqual(count - 1);
            fixture.detectChanges();
            cards = fixture.debugElement.queryAll(By.css('mat-card'));
            expect(cards.length).toEqual(count - 1);
        });
    }));

});
