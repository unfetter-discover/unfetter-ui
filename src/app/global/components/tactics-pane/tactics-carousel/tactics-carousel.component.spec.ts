import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { CarouselModule } from 'primeng/primeng';

import { TacticsCarouselComponent } from './tactics-carousel.component';
import { TacticsControlService } from '../tactics-control.service';
import { TacticsTooltipService } from '../tactics-tooltip/tactics-tooltip.service';
import { ResizeDirective } from '../../../directives/resize.directive';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { reducers } from '../../../../root-store/app.reducers';

describe('TacticCarouselComponent', () => {

    let component: TacticsCarouselComponent;
    let fixture: ComponentFixture<TacticsCarouselComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    CarouselModule,
                    StoreModule.forRoot(reducers),
                ],
                declarations: [
                    TacticsCarouselComponent,
                    ResizeDirective,
                    CapitalizePipe,
                ],
                providers: [
                    TacticsControlService,
                    TacticsTooltipService,
                ]
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
