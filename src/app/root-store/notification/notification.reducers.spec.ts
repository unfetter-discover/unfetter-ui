import { NotificationState, initialState, notificationReducer } from './notification.reducers';
import * as notificationActions from './notification.actions';
import { AppNotification } from './notification.model';

describe('notificationReducer', () => { 
    let mockInitialState: NotificationState;
    let mockNotifications: AppNotification[];
    let mockState: NotificationState;

    beforeEach(() => {
        mockInitialState = initialState;
        mockNotifications = [
            {
                read: false,
                type: 'foo',
                heading: 'foo',
                submitted: new Date('2018-05-07T15:58:08.291Z'),
                _id: '1234',
                body: 'foo'
            },
            {
                read: false,
                type: 'bar',
                heading: 'bar',
                submitted: new Date('2018-05-07T15:58:08.291Z'),
                _id: '5678',
                body: 'bar'
            }
        ];
        mockState = {
            notifications: [ ...mockNotifications ]
        };
    });

    it('should return initial state', () => {
        expect(notificationReducer(undefined, {} as notificationActions.NotificationActions)).toBe(mockInitialState);
    });

    it('should set notifications', () => {
        expect(notificationReducer(undefined, new notificationActions.SetNotifications(mockNotifications))).toEqual(mockState);
    });

    it('should add notification', () => {
        const expected = {
            notifications: [mockNotifications[0]]
        };
        expect(notificationReducer(undefined, new notificationActions.AddNotification(mockNotifications[0]))).toEqual(expected);
    });

    it('should update notification', () => {
        const payload = {
            read: true,
            type: 'foo2',
            heading: 'foo2',
            submitted: new Date('2018-05-07T15:58:08.291Z'),
            _id: '1234',
            body: 'foo2'
        };
        const expected = {
            notifications: [ payload, mockNotifications[1] ]
        };
        expect(notificationReducer(mockState, new notificationActions.UpdateNotification(payload))).toEqual(expected);
    });

    it('should delete notification', () => {
        const payload = '5678';
        const expected = {
            notifications: [mockNotifications[0]]
        };
        expect(notificationReducer(mockState, new notificationActions.DeleteNotification(payload))).toEqual(expected);
    });

    it('should mark notifications as read', () => {
        const expected = {
            notifications: mockNotifications.map((n) => ({...n, read: true}))
        };
        expect(notificationReducer(mockState, new notificationActions.MarkAllAsRead())).toEqual(expected);
    });
});
