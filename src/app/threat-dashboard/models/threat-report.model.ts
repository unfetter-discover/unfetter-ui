import { Boundaries } from './boundaries';
import { Report } from '../../models/report';

export class ThreatReport {
    public author = '';
    public date = new Date();
    public description: string;
    public id = '';
    public name: string;
    public published = false;

    public boundaries = new Boundaries();
    public reports: Array<Partial<Report>> = [];

    public isEmpty(): boolean {
        return this.boundaries.emptyBoundries() && this.reports.length === 0;
    }
}
