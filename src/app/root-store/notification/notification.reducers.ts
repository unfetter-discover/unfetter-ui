import * as notificationActions from './notification.actions';

import { AppNotification } from './notification.model';

export interface NotificationState {
    notifications: AppNotification[]
}

// Uncomment the fake notifications to test
const initialState: NotificationState = {
    notifications: []
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
            const notificationsCopy = [...state.notifications];
            notificationsCopy.splice(action.payload, 1);
            return {
                ...state,
                notifications: notificationsCopy
            };
        case notificationActions.MARK_ALL_AS_READ:
            const updatedNotifications = state.notifications
                .map((notification) => ({ ...notification, read: true}));
            return {
                ...state,
                notifications: updatedNotifications
            };
        default: 
            return state;
    }
}
