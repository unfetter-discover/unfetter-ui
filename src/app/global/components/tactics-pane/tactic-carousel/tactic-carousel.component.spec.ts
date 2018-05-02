import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticCarouselComponent } from './tactic-carousel.component';

describe('TacticCarouselComponent', () => {

    let component: TacticCarouselComponent;
    let fixture: ComponentFixture<TacticCarouselComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [ TacticCarouselComponent ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TacticCarouselComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
