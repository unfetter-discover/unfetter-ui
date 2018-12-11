export enum WSMessageTypes {
    NOTIFICATION = 'NOTIFICATION',
    STIX = 'STIX',
    SYSTEM = 'SYSTEM',
    SOCIAL = 'SOCIAL',
    STIXID = 'STIXID',
    USER_OBJECT = 'USER_OBJECT'
}

/**
 * @description Type of messageContent on WSMessageTypes.SOCIAL
 */
export enum WSSocialTypes {
    COMMENT = 'COMMENT',
    REPLY = 'REPLY'
}
