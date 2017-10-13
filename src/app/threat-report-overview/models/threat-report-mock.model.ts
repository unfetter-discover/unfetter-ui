import { ThreatReport } from './threat-report.model';

export class ThreatReportMock {

    public static mock(id = 1): ThreatReport {
        return {
                id,
                name: `name-${id}`,
                date: new Date(),
                author: `author-${id}`
              } as ThreatReport;
    }

    public static mockMany(lim = 10): ThreatReport[] {
        const arr: ThreatReport[] = Array(lim);
        for (let i = 0; i < lim; i++) {
          arr[i] = { 
                id: i,
                name: `name-${i}`,
                date: new Date(),
                author: `author-${i}`
              } as ThreatReport
        }
        return arr;
    }
}
