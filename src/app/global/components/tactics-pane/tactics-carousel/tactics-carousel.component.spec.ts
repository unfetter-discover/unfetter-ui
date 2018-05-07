import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselModule } from 'primeng/primeng';

import { TacticsCarouselComponent } from './tactics-carousel.component';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { TacticControlService } from '../tactic-control.service';

describe('TacticCarouselComponent', () => {

    let component: TacticsCarouselComponent;
    let fixture: ComponentFixture<TacticsCarouselComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    CarouselModule,
                ],
                declarations: [
                    TacticsCarouselComponent,
                    CapitalizePipe,
                ],
                providers: [TacticControlService]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TacticsCarouselComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
