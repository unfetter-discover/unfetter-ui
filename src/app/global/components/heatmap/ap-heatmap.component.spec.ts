import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApHeatmapComponent } from './ap-heatmap.component';

describe('ApHeatmapComponent', () => {

    let component: ApHeatmapComponent;
    let fixture: ComponentFixture<ApHeatmapComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ApHeatmapComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApHeatmapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
