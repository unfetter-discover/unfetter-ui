import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatTabsModule } from '@angular/material';

import { FeedComponent } from './feed.component';
import { SideBoardComponent } from '../side-board/side-board.component';
import { ThreatHeaderComponent } from '../threat-header/threat-header.component';
import { GlobalModule } from '../../global/global.module';
import { threatReducer } from '../store/threat.reducers';

describe('FeedComponent', () => {

    let component: FeedComponent;
    let fixture: ComponentFixture<FeedComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    RouterTestingModule,
                    MatTabsModule,
                    MatIconModule,
                    GlobalModule,
                    NoopAnimationsModule,
                    StoreModule.forRoot(threatReducer),
                ],
                declarations: [
                    FeedComponent,
                    ThreatHeaderComponent,
                    SideBoardComponent,
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
