import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticsTreemapComponent } from './tactics-treemap.component';

describe('TacticsTreemapComponent', () => {

    let component: TacticsTreemapComponent;
    let fixture: ComponentFixture<TacticsTreemapComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TacticsTreemapComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TacticsTreemapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
