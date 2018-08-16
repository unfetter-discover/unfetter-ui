import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material';

import { NotificationWindowComponent } from './notification-window.component';
import { FieldSortPipe } from '../../pipes/field-sort.pipe';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { GenericApi } from '../../../core/services/genericapi.service';
import { AuthService } from '../../../core/services/auth.service';
import { ConfigService } from '../../../core/services/config.service';
import { reducers, AppState } from '../../../root-store/app.reducers';
import * as notificationActions from '../../../root-store/notification/notification.actions';

describe('NotificationWindowComponent', () => {

    let fixture: ComponentFixture<NotificationWindowComponent>;
    let component: NotificationWindowComponent;
    let store: Store<AppState>;

    const mockNotifications = [
        {
            _id: 'notification--1',
            type: 'test',
            heading: 'This is a test',
            body: 'This is a test of the Unfetter Notification System. Please disregard.',
            submitted: new Date(),
            read: false,
        },
        {
            _id: 'notification--2',
            type: 'test',
            heading: 'This is another test',
            body: 'This is one more test of the Unfetter Notification System. Please also disregard.',
            submitted: new Date(),
            read: false,
        },
    ];

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [ 
                    NotificationWindowComponent,
                    FieldSortPipe,
                    TimeAgoPipe            
                ],
                imports: [
                    NoopAnimationsModule,
                    MatIconModule,
                    RouterTestingModule,
                    HttpClientTestingModule,
                    StoreModule.forRoot(reducers)
                ],
                providers: [
                    AuthService,
                    GenericApi,
                    ConfigService
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationWindowComponent);
        component = fixture.componentInstance;
        component.showNotificationBar = true;
        store = component['store'];
        store.dispatch(new notificationActions.SetNotifications(mockNotifications));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should mark as read', () => {
        const spy = spyOn(store, 'dispatch').and.callThrough();
        component.markAsRead(mockNotifications[0]);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(spy).toHaveBeenCalledWith(new notificationActions.EmitReadNotification(mockNotifications[0]));
        });
    });

    it('should mark all as read', () => {
        const spy = spyOn(store, 'dispatch').and.callThrough();
        component.markAllAsRead();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(spy).toHaveBeenCalledWith(new notificationActions.EmitReadAllNotifications());
        });
    });

    it('should delete', () => {
        const spy = spyOn(store, 'dispatch').and.callThrough();
        component.deleteNotification(mockNotifications[1]._id);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(spy).toHaveBeenCalledWith(new notificationActions.EmitDeleteNotification(mockNotifications[1]._id));
        });
    });

    it('should delete all', () => {
        const spy = spyOn(store, 'dispatch').and.callThrough();
        component.deleteAll();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(spy).toHaveBeenCalledWith(new notificationActions.EmitDeleteAllNotifications());
        });
    });

});
