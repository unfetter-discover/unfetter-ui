import { Boundries } from './boundries';

export class ThreatReport {
    public id = '';
    public name: string;
    public date = new Date();
    public author = 'n/a';

    public boundries = new Boundries();
    public reports = [];

    public isEmpty(): boolean {
        return this.boundries.emptyBoundries() && this.reports.length === 0;
    }
}
