import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackPatternsHeatmapComponent } from './attack-patterns-heatmap.component';

describe('AttackPatternsHeatmapComponent', () => {

    let component: AttackPatternsHeatmapComponent;
    let fixture: ComponentFixture<AttackPatternsHeatmapComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AttackPatternsHeatmapComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AttackPatternsHeatmapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
