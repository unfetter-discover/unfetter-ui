import { Action } from '@ngrx/store';

import { AppNotification } from './notification.model';

export const ADD_NOTIFCATION = '[Notification] Add Notification';
export const UPDATE_NOTIFCATION = '[Notification] Update Notification';
export const DELETE_NOTIFCATION = '[Notification] Delete Notification';
export const MARK_ALL_AS_READ = '[Notification] Mark All As Read';
export const START_NOTIFICATION_STREAM = '[Notification] Start Notification Stream';

export class AddNotification implements Action {
    public readonly type = ADD_NOTIFCATION;

    constructor(public payload: AppNotification) {}
}

export class UpdateNotification implements Action {
    public readonly type = UPDATE_NOTIFCATION;

    constructor(public payload: { notification: AppNotification, index: number}) { }
}

export class DeleteNotification implements Action {
    public readonly type = DELETE_NOTIFCATION;

    constructor(public payload: number) { }
}

export class MarkAllAsRead implements Action {
    public readonly type = MARK_ALL_AS_READ;

    constructor(public payload = null) { }
}

export class StartNotificationStream implements Action {
    public readonly type = START_NOTIFICATION_STREAM;
}

export type NotificationActions =
    AddNotification |
    UpdateNotification |
    DeleteNotification |
    MarkAllAsRead |
    StartNotificationStream;
