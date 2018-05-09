import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
    MatButtonToggleModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
} from '@angular/material';

import { TacticsCarouselControlComponent } from './tactics-carousel-control.component';
import { TacticsControlService } from '../tactics-control.service';

describe('TacticCarouselControlComponent', () => {

    let component: TacticsCarouselControlComponent;
    let fixture: ComponentFixture<TacticsCarouselControlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatButtonToggleModule,
                MatIconModule,
                MatOptionModule,
                MatSelectModule,
                MatToolbarModule,
            ],
            declarations: [TacticsCarouselControlComponent],
            providers: [TacticsControlService],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TacticsCarouselControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
