export interface AppNotification {
    read: boolean,
    type: string,
    heading: string,
    body: string,
    submitted: Date,
    _id: string
    link?: string
}

export enum NotificationEmitTypes {
    READ_NOTIFICATION = 'READ_NOTIFICATION',
    DELETE_NOTIFICATION = 'DELETE_NOTIFICATION',
    READ_ALL_NOTIFICATIONS = 'READ_ALL_NOTIFICATIONS',
    DELETE_ALL_NOTIFICATIONS = 'DELETE_ALL_NOTIFICATIONS'
}
