import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule, MatButtonModule } from '@angular/material';

import { KillChainPhasesComponent } from './kill-chain-phases.component';

describe('KillChainPhasesComponent', () => {

    let component: KillChainPhasesComponent;
    let fixture: ComponentFixture<KillChainPhasesComponent>;

    const mockModel = {
        attributes: {
            kill_chain_phases: [
                {phase_name: 'A', kill_chain_name: 'tactic-1'},
                {phase_name: 'A', kill_chain_name: 'tactic-2'},
                {phase_name: 'B', kill_chain_name: 'tactic-3'},
                {phase_name: 'B', kill_chain_name: 'tactic-4'},
                {phase_name: 'B', kill_chain_name: 'tactic-5'},
                {phase_name: 'C', kill_chain_name: 'tactic-6'},
            ]
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MatCardModule,
                MatInputModule,
                MatButtonModule,
                BrowserAnimationsModule,
            ],
            declarations: [
                KillChainPhasesComponent,
            ],
            providers: [
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KillChainPhasesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle model kill-chain phases', async(() => {
        component.model = Object.assign({}, mockModel);
        const count = mockModel.attributes.kill_chain_phases.length;
        fixture.detectChanges();

        let cards = fixture.debugElement.queryAll(By.css('mat-card'));
        expect(cards).not.toBeNull();
        expect(cards.length).toEqual(count);
    }));

    it('should handle add kill chain clicks', async(() => {
        component.model = { attributes: {} };
        fixture.detectChanges();

        let add = fixture.debugElement.query(By.css('a#add-kill-chain'));
        expect(add).not.toBeNull();
        add.nativeElement.click();
        fixture.detectChanges();
        expect(component.model.attributes.kill_chain_phases.length).toEqual(1);
        let cards = fixture.debugElement.queryAll(By.css('mat-card'));
        expect(cards).not.toBeNull();
        expect(cards.length).toEqual(1);

        add = fixture.debugElement.query(By.css('a#add-kill-chain'));
        add.nativeElement.click();
        fixture.detectChanges();
        expect(component.model.attributes.kill_chain_phases.length).toEqual(2);
        cards = fixture.debugElement.queryAll(By.css('mat-card'));
        expect(cards).not.toBeNull();
        expect(cards.length).toEqual(2);
    }));

    it('should handle model kill-chain phases', async(() => {
        component.model = Object.assign({}, mockModel);
        const count = mockModel.attributes.kill_chain_phases.length;
        fixture.detectChanges();

        // try removing a random card
        let rand = Math.floor(Math.random() * count);
        let cards = fixture.debugElement.queryAll(By.css('mat-card'));
        let card = cards[rand].query(By.css('a[mat-raised-button]'));
        expect(card).not.toBeNull();
        card.nativeElement.click();
        fixture.whenStable().then(() => {
            expect(component.model.attributes.kill_chain_phases.length).toEqual(count - 1);
            fixture.detectChanges();
            cards = fixture.debugElement.queryAll(By.css('mat-card'));
            expect(cards.length).toEqual(count - 1);
        });
    }));

});
