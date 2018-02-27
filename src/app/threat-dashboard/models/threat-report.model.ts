import { Boundaries } from './boundaries';
import { Report } from '../../models/report';

export class ThreatReport {
    public id = '';
    public name: string;
    public date = new Date();
    public author = '';
    public published = false;

    public boundaries = new Boundaries();
    public reports: Array<Partial<Report>> = [];

    public isEmpty(): boolean {
        return this.boundaries.emptyBoundries() && this.reports.length === 0;
    }
}
