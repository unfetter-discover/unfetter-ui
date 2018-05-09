import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material';

import { TacticsTooltipComponent } from './tactics-tooltip.component';
import { TacticsTooltipService } from './tactics-tooltip.service';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { AuthService } from '../../../../core/services/auth.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../../root-store/app.reducers';

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
                CapitalizePipe,
            ],
            providers: [
                AuthService,
                TacticsTooltipService,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TacticsTooltipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
