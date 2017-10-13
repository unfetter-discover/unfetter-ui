import { Boundries } from './boundries';

export class ThreatReport {
    public id = -1;
    public name: string;
    public date?: string;
    public author?: string;

    public boundries = new Boundries();
    public reports = [];
}
