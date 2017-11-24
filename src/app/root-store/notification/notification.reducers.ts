import * as notificationActions from './notification.actions';

import { AppNotification } from './notification.model';

export interface NotificationState {
    notifications: AppNotification[]
}

const initialState: NotificationState = {
    notifications: [
        {
            read: false,
            type: 'COMMENT',
            heading: 'This is a test',
            body: 'Lorem Ipsum',
            submitted: new Date()
        },
        {
            read: false,
            type: 'COMMENT',
            heading: 'Yet another test',
            body: 'Lorem Ipsum',
            submitted: new Date()
        }
    ]
};

export function notificationReducer(state = initialState, action: notificationActions.NotificationActions) {
    switch (action.type) {
        case notificationActions.ADD_NOTIFCATION:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    action.payload
                ]
            };
        case notificationActions.UPDATE_NOTIFCATION:
            const notificationToUpdate = state.notifications[action.payload.index];
            const updatedNotification = {
                ...notificationToUpdate,
                ...action.payload.notification
            };
            const iNotifications = [...state.notifications];
            iNotifications[action.payload.index] = updatedNotification;
            return {
                ...state,
                notifications: iNotifications
            };
        case notificationActions.DELETE_NOTIFCATION:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    action.payload
                ]
            };
        default: 
            return state;
    }
}
