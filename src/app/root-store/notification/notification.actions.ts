import { Action } from '@ngrx/store';

import { AppNotification } from './notification.model';

export const ADD_NOTIFCATION = '[Notification] Add Notification';
export const UPDATE_NOTIFCATION = '[Notification] Update Notification';
export const DELETE_NOTIFCATION = '[Notification] Delete Notification';
export const DELETE_ALL_NOTIFCATIONS = '[Notification] Delete All Notifications';
export const MARK_ALL_AS_READ = '[Notification] Mark All As Read';
export const START_NOTIFICATION_STREAM = '[Notification] Start Notification Stream';
export const FETCH_NOTIFICATION_STORE = '[Notification] Fetch Notification Store';
export const EMIT_READ_NOTIFCATION = '[Notification] Emit Read Notification';
export const EMIT_DELETE_NOTIFCATION = '[Notification] Emit Delete Notification';
export const EMIT_READ_ALL_NOTIFCATIONS = '[Notification] Emit Read All Notifications';
export const EMIT_DELETE_ALL_NOTIFCATIONS = '[Notification] Emit Delete All Notifications';

export class AddNotification implements Action {
    public readonly type = ADD_NOTIFCATION;

    constructor(public payload: AppNotification) {}
}

export class UpdateNotification implements Action {
    public readonly type = UPDATE_NOTIFCATION;

    constructor(public payload: AppNotification) { }
}

export class DeleteNotification implements Action {
    public readonly type = DELETE_NOTIFCATION;

    constructor(public payload: string) { }
}

export class DeleteAllNotifications implements Action {
    public readonly type = DELETE_ALL_NOTIFCATIONS;
}

export class MarkAllAsRead implements Action {
    public readonly type = MARK_ALL_AS_READ;

    constructor(public payload = null) { }
}

export class StartNotificationStream implements Action {
    public readonly type = START_NOTIFICATION_STREAM;
}

export class FetchNotificationStore implements Action {
    public readonly type = FETCH_NOTIFICATION_STORE;
}

export class EmitReadNotification implements Action {
    public readonly type = EMIT_READ_NOTIFCATION;

    constructor(public payload: AppNotification) { }
}

export class EmitDeleteNotification implements Action {
    public readonly type = EMIT_DELETE_NOTIFCATION;

    constructor(public payload: string) { }
}

export class EmitReadAllNotifications implements Action {
    public readonly type = EMIT_READ_ALL_NOTIFCATIONS;
}

export class EmitDeleteAllNotifications implements Action {
    public readonly type = EMIT_DELETE_ALL_NOTIFCATIONS;
}

export type NotificationActions =
    AddNotification |
    UpdateNotification |
    DeleteNotification |
    DeleteAllNotifications |
    MarkAllAsRead |
    StartNotificationStream |
    FetchNotificationStore |
    EmitReadNotification |
    EmitDeleteNotification |
    EmitReadAllNotifications |
    EmitDeleteAllNotifications;
