import { ThreatReport } from './threat-report.model';

export class ThreatReportMock {

    public static mock(id = 'abc'): ThreatReport {
        return {
            id,
            name: `name-${id}`,
            date: new Date(),
            author: `author-${id}`
        } as ThreatReport;
    }

    public static mockMany(lim = 10): ThreatReport[] {
        const arr: ThreatReport[] = [];
        for (let i = 0; i < lim; i++) {
            const threatReport = new ThreatReport();
            threatReport.id = `${i}`;
            threatReport.name = `name-${i}`;
            threatReport.date = new Date();
            threatReport.author = `author-${i}`;
            arr[i] = threatReport;
        }
        return arr;
    }
}
