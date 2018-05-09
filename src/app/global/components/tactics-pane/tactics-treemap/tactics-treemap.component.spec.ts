import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material';

import { TacticsTreemapComponent } from './tactics-treemap.component';
import { TacticsControlService } from '../tactics-control.service';
import { TacticsTooltipService } from '../tactics-tooltip/tactics-tooltip.service';
import { TreemapComponent } from '../../treemap/treemap.component';
import { reducers } from '../../../../root-store/app.reducers';

xdescribe('TacticsTreemapComponent', () => {

    let component: TacticsTreemapComponent;
    let fixture: ComponentFixture<TacticsTreemapComponent>;
    let treemap: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                OverlayModule,
                HttpClientTestingModule,
                StoreModule.forRoot(reducers),
            ],
            declarations: [
                TacticsTreemapComponent,
                TreemapComponent,
            ],
            providers: [
                TacticsControlService,
                TacticsTooltipService,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TacticsTreemapComponent);
        treemap = fixture.debugElement.query(By.css('div.tree-map'));
        treemap.nativeElement.style.width = '400px';
        treemap.nativeElement.style.height = '400px';
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
