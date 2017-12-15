import { Boundries } from './boundries';
import { Report } from '../../models/report';

export class ThreatReport {
    public id = '';
    public name: string;
    public date = new Date();
    public author = '';
    public published = false;

    public boundries = new Boundries();
    public reports: Array<Partial<Report>> = [];

    public isEmpty(): boolean {
        return this.boundries.emptyBoundries() && this.reports.length === 0;
    }
}
