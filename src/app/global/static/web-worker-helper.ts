import { Observable, of as observableOf, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * @description All WebWorker file paths should be present here
 */
export const enum WorkerUrls {
    PII_CHECK = 'assets/workers/pii-check.js'
}

export interface WorkerMessage<T = any> {
    payload: T,
    action?: 'CLOSE' | any
}

/**
 * @description Contains centralized functionality for web worker interaction
 */
export class WebWorkerHelpers {

    /**
     * @param  {Observable<U>} messages$
     * @param  {WorkerUrls} workerUrl
     * @returns Observable
     * @description Takes an observable of messages to be posted to a web worker,
     *      returns an observable of messages recieved from the web worker
     */
    public static createWebWorkerSubject<T = any, U = any>(messages$: Observable<WorkerMessage<U>>, workerUrl: WorkerUrls): Observable<T> {
        if (typeof (Worker) !== 'undefined') {
            try {
                const worker = new Worker(workerUrl);
                const observer = {
                    next: (msg) => worker.postMessage(msg)
                };

                const observable = new Observable((workerObs) => {
                    worker.onmessage = (msg: MessageEvent) => workerObs.next(msg.data);
                    return () => {
                        worker.postMessage({ action: 'CLOSE' });
                    };
                });

                const webWorkerSubject = Subject.create(observer, observable);

                messages$.subscribe(
                    (msg) => {
                        webWorkerSubject.next(msg);
                    }
                );

                return webWorkerSubject;
            } catch (error) {
                console.log('An error occured while attempting to create the web worker: ', error);
                return observableOf(null);
            }
        } else {
            console.log('Web workers are not supported in this browser');
            return observableOf(null);
        }
    }
}
