import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { UnfetterCarouselComponent } from './unf-carousel.component';

describe('UnfCarouselComponent', () => {

    let component: UnfetterCarouselComponent;
    let fixture: ComponentFixture<UnfetterCarouselComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [
                    UnfetterCarouselComponent,
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnfetterCarouselComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
