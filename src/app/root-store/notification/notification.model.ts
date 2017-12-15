export interface AppNotification {
    read: boolean,
    type: string,
    heading: string,
    body: string,
    submitted: Date,
    link?: string
}
