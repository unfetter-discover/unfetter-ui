import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material';

import { HeatmapComponent } from './heatmap.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../root-store/app.reducers';
import { TacticsTooltipComponent } from './tactics-tooltip.component';

describe('TacticsTooltipComponent should', () => {

    let component: TacticsTooltipComponent;
    let fixture: ComponentFixture<TacticsTooltipComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                OverlayModule,
                RouterTestingModule,
                StoreModule.forRoot(reducers),
            ],
            declarations: [
                TacticsTooltipComponent,
                HeatmapComponent,
                CapitalizePipe,
            ],
            providers: [AuthService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TacticsTooltipComponent);
        component = fixture.componentInstance;
        component.attackPatterns = [];
        component.options = {};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
