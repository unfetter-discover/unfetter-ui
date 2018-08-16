import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatIconModule, MatToolbarModule, MatAccordion } from '@angular/material';

import { SidepanelComponent } from './sidepanel.component';
import { SidepanelMiniItemComponent } from './sidepanel-mini-item.component';
import { SidepanelOptionItemComponent } from './sidepanel-option-item.component';

describe('SidepanelComponent', () => {

    let fixture: ComponentFixture<SidepanelComponent>;
    let component: SidepanelComponent;

    // coverage
    const mini = new SidepanelMiniItemComponent();
    const option = new SidepanelOptionItemComponent();

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    NoopAnimationsModule,
                    MatIconModule,
                    MatMenuModule,
                    MatToolbarModule,
                ],
                declarations: [
                    SidepanelComponent,
                    MatAccordion,
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidepanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display an item', () => {
        component.item = { name: 'A Thing' };
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
        });
    });

});
