export interface AppNotification {
    read: boolean,
    type: string,
    heading: string,
    body: string,
    submitted: Date,
    _id: string
    link?: string
}
