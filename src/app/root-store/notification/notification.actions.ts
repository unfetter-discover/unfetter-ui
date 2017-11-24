import { Action } from '@ngrx/store';

import { Notification } from './notification.model';

export const ADD_NOTIFCATION = '[Notification] Add Notification';
export const UPDATE_NOTIFCATION = '[Notification] Update Notification';
export const DELETE_NOTIFCATION = '[Notification] Delete Notification';

export class AddNotification implements Action {
    public readonly type = ADD_NOTIFCATION;

    constructor(public payload: Notification) {}
}

export class UpdateNotification implements Action {
    public readonly type = UPDATE_NOTIFCATION;

    constructor(public payload: Notification) { }
}

export class DeleteNotification implements Action {
    public readonly type = DELETE_NOTIFCATION;

    constructor(public payload: Notification) { }
}

export type NotificationActions =
    AddNotification |
    UpdateNotification |
    DeleteNotification;
