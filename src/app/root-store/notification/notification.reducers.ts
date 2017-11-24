import * as notificationActions from './notification.actions';

import { Notification } from './notification.model';

export interface NotificationState {
    notifications: Notification[]
}

const initialState: NotificationState = {
    notifications: [
        {
            read: false,
            type: 'COMMENT',
            heading: 'This is a test',
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
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    action.payload
                ]
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
