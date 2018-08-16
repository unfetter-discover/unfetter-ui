import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule, MatListModule } from '@angular/material';

import { SidepanelListItemComponent } from './sidepanel-list-item.component';

describe('SidepanelListItemComponent', () => {

    let fixture: ComponentFixture<SidepanelListItemComponent>;
    let component: SidepanelListItemComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    NoopAnimationsModule,
                    MatExpansionModule,
                    MatListModule,
                ],
                declarations: [
                    SidepanelListItemComponent,
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidepanelListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create with actual items', () => {
        component.label = 'Test';
        component.icon = 'icon';
        component.items = [
            { id: 1, name: 'A', },
            { id: 2, name: 'B', },
            { id: 3, name: 'C', },
            { id: 4, name: 'D', },
        ];
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
        });
    });

});
