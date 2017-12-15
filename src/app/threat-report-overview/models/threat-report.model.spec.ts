import { ThreatReport } from './threat-report.model';
import { ReportMock } from '../../models/report-mock.model';

describe('threat report model', () => {

    it('canary', () => {
        const threatReport = new ThreatReport();
        expect(threatReport).toBeTruthy();
    });

    it('should know when it is empty', () => {
        const tro = new ThreatReport();
        expect(tro.isEmpty()).toBeTruthy();
    });

    it('should know when it is not empty', () => {
        const tro = new ThreatReport();
        tro.reports = ReportMock.mockMany(2);
        expect(tro.isEmpty());
    });
});
