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
            const notificationToUpdateIndex = state.notifications.findIndex((notification) => notification._id === action.payload._id);
            if (notificationToUpdateIndex > -1) {
                const notificationToUpdate = state.notifications[notificationToUpdateIndex];
                const iNotifications = [...state.notifications];
                iNotifications[notificationToUpdateIndex] = action.payload;
                return {
                    ...state,
                    notifications: iNotifications
                };
            } else {
                return state;
            }
            
        case notificationActions.DELETE_NOTIFCATION:
            const notificationToDeleteIndex = state.notifications.findIndex((notification) => notification._id === action.payload);
            if (notificationToDeleteIndex > -1) {
                const notificationsCopy = [...state.notifications];
                notificationsCopy.splice(notificationToDeleteIndex, 1);
                return {
                    ...state,
                    notifications: notificationsCopy
                };
            } else {
                return state;
            }
        case notificationActions.DELETE_ALL_NOTIFCATIONS:
            return {
                ...state,
                notifications: []
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
