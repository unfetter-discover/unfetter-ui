import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { FormsModule } from '@angular/forms';
import {
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
} from '@angular/material';
import { MarkdownModule } from 'ngx-markdown';
import { SimplemdeModule } from 'ng2-simplemde';

import { ActivityFeedComponent } from './activity-feed.component';
import { LoadingSpinnerComponent } from '../../../global/components/loading-spinner/loading-spinner.component';
import { FieldSortPipe } from '../../../global/pipes/field-sort.pipe';
import { TimeAgoPipe } from '../../../global/pipes/time-ago.pipe';
import { reducers } from '../../../root-store/app.reducers';

describe('ActivityFeedComponent', () => {

    let fixture: ComponentFixture<ActivityFeedComponent>;
    let component: ActivityFeedComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    FormsModule,
                    MatCardModule,
                    MatRadioModule,
                    MatInputModule,
                    MatProgressSpinnerModule,
                    MarkdownModule,
                    SimplemdeModule,
                    StoreModule.forRoot(reducers),
                ],
                declarations: [
                    ActivityFeedComponent,
                    LoadingSpinnerComponent,
                    FieldSortPipe,
                    TimeAgoPipe,
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityFeedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /*
     * TODO:
     * - give the component a threatboard
     * - add store for user, users and threatboard article/comments (give the latter a lot of stuff)
     * - check user identities on feed items
     * - sort feed by newest, oldest, most likes and most comments
     * - click add comment; confirm changed display
     * - insert comment; conifrm new comment is on feed, confirm persistence
     */

});
