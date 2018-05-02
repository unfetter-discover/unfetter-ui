import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material';

import { AttackPatternsHeatmapComponent } from './attack-patterns-heatmap.component';
import { HeatmapComponent } from './heatmap.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../root-store/app.reducers';

describe('AttackPatternsHeatmapComponent', () => {

    let component: AttackPatternsHeatmapComponent;
    let fixture: ComponentFixture<AttackPatternsHeatmapComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                OverlayModule,
                RouterTestingModule,
                StoreModule.forRoot(reducers),
            ],
            declarations: [
                AttackPatternsHeatmapComponent,
                HeatmapComponent,
                CapitalizePipe,
            ],
            providers: [AuthService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AttackPatternsHeatmapComponent);
        component = fixture.componentInstance;
        component.attackPatterns = [];
        component.options = {};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
