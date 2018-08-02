import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';

import { FooterComponent } from './footer.component';
import * as fromRoot from '../../../root-store/app.reducers';
import * as configActions from '../../../root-store/config/config.actions';

describe('FooterComponent', () => {

    let fixture: ComponentFixture<FooterComponent>;
    let component: FooterComponent;
    let store: Store<fromRoot.AppState>;

    const config = {
        'showBanner': true,
        'bannerText': 'This is a test',
        'contentOwner': 'bob',
        'pagePublisher': 'bob',
        'lastReviewed': 20170404,
        'lastModified': 20170404,
        'footerTextHtml': '<p>hi</p><br><p>More stuff!</p>',
    };

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    StoreModule.forRoot(fromRoot.reducers),
                ],
                declarations: [
                    FooterComponent,
                ],
                schemas: [NO_ERRORS_SCHEMA],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        store = component['store'];
        store.dispatch(new configActions.LoadRunConfig(config));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
