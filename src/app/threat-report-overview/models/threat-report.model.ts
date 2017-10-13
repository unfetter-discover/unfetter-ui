import { Boundries } from './boundries';

export class ThreatReport {
    public id = -1;
    public name: string;
    public date = new Date();
    public author = 'n/a';

    public boundries = new Boundries();
    public reports = [];
}
