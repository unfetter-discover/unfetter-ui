export interface WorkerMessage<T> {
    payload: T;
    jobId: number;
    action?: string;
    component?: number | string;
}
