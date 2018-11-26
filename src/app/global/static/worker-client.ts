import { WorkerTypes } from '../enums/web-workers.enum';
import { WebWorkerService } from '../../core/services/web-worker.service';
import { Observable } from 'rxjs';

export class WorkerClient<T = any, P = any> {
    genericWorkerService: WebWorkerService;
    componentId: number;
    workerType: WorkerTypes;

    constructor(genericWorkerService: WebWorkerService, workerType: WorkerTypes) {
        this.genericWorkerService = genericWorkerService;
        this.workerType = workerType;
        this.componentId = this.genericWorkerService.generateComponentId();
    }

    connect(): Observable<T> {
        return this.genericWorkerService.connect(this.workerType, this.componentId);
    }    

    singleJob(payload: P): Observable<T> {
        return this.genericWorkerService.submitJob(this.workerType, payload);
    }

    sendMessage(payload: P) {
        this.genericWorkerService.sendMessage(this.workerType, payload, this.componentId);
    }
}
