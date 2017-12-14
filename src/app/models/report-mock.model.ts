import { Report } from './report';

import * as UUID from 'uuid';

export class ReportMock {

    public static mockAttribs(): any {
        return {
            version: '2.0',
            created: new Date(),
            modified: new Date(),
            description: 'description',
            name: 'name',
            published: new Date(),
            labels: ['label1', 'label2'],
            object_refs: ['attack-pattern-' + UUID.v4()],
            external_references: [],
            kill_chain_phases: [],
            metaProperties: { },
        };
    }

    public static mock(id = UUID): Report {
        const report = new Report();
        report.id = UUID.v4();
        report.type = 'report';
        report.url = 'https://domain.io/report/' + report.id;
        report.attributes = ReportMock.mockAttribs();
        return report;
    }

    public static mockMany(lim = 10): Report[] {
        const arr: Report[] = [];
        for (let i = 0; i < lim; i++) {
            const report = ReportMock.mock();
            arr[i] = report;
        }
        return arr;
    }
}
