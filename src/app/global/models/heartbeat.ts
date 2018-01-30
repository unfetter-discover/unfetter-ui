export const enum HeartbeatStatus {
    RUNNING = 'RUNNING',
    DOWN = 'DOWN',
    UNKNOWN = 'UNKNOWN'
}

export interface Heartbeat {
    service: string;
    status: HeartbeatStatus;
}
