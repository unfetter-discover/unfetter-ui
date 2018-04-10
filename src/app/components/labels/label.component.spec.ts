import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatInputModule } from '@angular/material';

import { LabelComponent } from './label.component';

describe('LabelComponent', () => {

    let component: LabelComponent;
    let fixture: ComponentFixture<LabelComponent>;

    const mockModel = {
        attributes: {
            labels: [
                'abcdefg',
                'hijklm',
                'nopqrst',
                'uvwxxy',
            ]
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                MatInputModule,
                BrowserAnimationsModule,
            ],
            declarations: [
                LabelComponent,
            ],
            providers: [
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LabelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display model data', async(() => {
        component.model = Object.assign({}, mockModel);
        fixture.detectChanges();

        // count all the cards
        let cards = fixture.debugElement.queryAll(By.css('mat-card'));
        expect(cards).not.toBeNull();
        expect(cards.length).toEqual(component.model.attributes.labels.length);
    }));

    it('should add new model data', async(() => {
        component.model = Object.assign({}, mockModel);
        const count = component.model.attributes.labels.length;
        fixture.detectChanges();

        // try adding a new label
        let add = fixture.debugElement.query(By.css('button#add-label'));
        expect(add).not.toBeNull();
        add.nativeElement.click();
        fixture.detectChanges();
        expect(component.model.attributes.labels.length).toEqual(count + 1);
        expect(component.model.attributes.labels.includes(' ')).toBeTruthy();
        let cards = fixture.debugElement.queryAll(By.css('mat-card'));
        expect(cards.length).toEqual(count + 1);
    }));

    it('should edit model data', async(() => {
        component.model = Object.assign({}, mockModel);
        const count = component.model.attributes.labels.length;
        fixture.detectChanges();

        // try editing a random card
        let rand = Math.floor(Math.random() * count);
        let cards = fixture.debugElement.queryAll(By.css('mat-card'));
        let input = cards[rand].query(By.css('input'));
        expect(input).not.toBeNull();
        input.nativeElement.value = 'modified';
        input.nativeElement.dispatchEvent(new Event('change'));
        fixture.whenStable().then(() => {
            expect(component.model.attributes.labels.includes('modified')).toBeTruthy();
            fixture.detectChanges()
            cards = fixture.debugElement.queryAll(By.css('mat-card'));
            expect(cards.length).toEqual(count);
        });
    }));

    it('should handle removing model data', async(() => {
        component.model = Object.assign({}, mockModel);
        const count = component.model.attributes.labels.length;
        fixture.detectChanges();

        // try removing a random card
        let cards = fixture.debugElement.queryAll(By.css('mat-card'));
        let rand = Math.floor(Math.random() * count);
        let remove = cards[rand].query(By.css('button[mat-raised-button]'));
        expect(remove).not.toBeNull();
        remove.nativeElement.click();
        fixture.whenStable().then(() => {
            expect(component.model.attributes.labels.length).toEqual(count - 1);
            fixture.detectChanges();
            cards = fixture.debugElement.queryAll(By.css('mat-card'));
            expect(cards.length).toEqual(count - 1);
        });
    }));

});
