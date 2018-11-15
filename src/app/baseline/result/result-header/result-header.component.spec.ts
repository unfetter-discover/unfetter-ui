import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { By } from '@angular/platform-browser';
import {
    MatIconModule,
    MatTabsModule,
} from '@angular/material';

import { ResultHeaderComponent } from './result-header.component';
import { SummaryCalculationService } from '../summary/summary-calculation.service';
import { InfoBarComponent } from '../../../global/components/info-bar/info-bar.component';
import { reducers } from '../../../root-store/app.reducers';

describe('ResultHeaderComponent', () => {

    let fixture: ComponentFixture<ResultHeaderComponent>;
    let component: ResultHeaderComponent;

    const serviceMock = {
        baseline: {}
    };

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    MatIconModule,
                    MatTabsModule,
                    RouterTestingModule,
                    StoreModule.forRoot(reducers),
                ],
                declarations: [
                    ResultHeaderComponent,
                    InfoBarComponent,
                ],
                providers: [
                    {
                        provide: SummaryCalculationService,
                        useValue: serviceMock
                    }
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a published string and no PUBLISH button if create date is known', () => {
        component.published = null;
        let publishButton = fixture.debugElement.query(By.css('#publishButton')).nativeElement;
        let publishArea = fixture.debugElement.query(By.css('.publishText'));
        expect(publishButton).toBeTruthy();
        expect(publishArea).toBeFalsy();

        component.published = new Date(2018, 2);
        fixture.detectChanges();
        publishArea = fixture.debugElement.query(By.css('.publishText')).nativeElement;
        expect(publishArea).toBeTruthy();
        publishButton = fixture.debugElement.query(By.css('#publishButton'));
        expect(publishButton).toBeFalsy();
    });

});
