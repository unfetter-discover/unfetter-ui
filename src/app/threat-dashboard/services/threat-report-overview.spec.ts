import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { inject } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { GenericApi } from '../../core/services/genericapi.service';
import { ThreatReportOverviewService } from './threat-report-overview.service';
import { ReportMock } from '../../models/report-mock.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ThreatReportMock } from '../models/threat-report-mock.model';
import { ThreatReport } from '../models/threat-report.model';

describe('Threat Report Overview Spec', () => {

  let subscriptions: Subscription[];
  beforeEach(() => {
    subscriptions = [];
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [ThreatReportOverviewService, GenericApi]
    });
  });

  afterEach(() => {
    if (subscriptions) {
      subscriptions
        .filter((sub) => sub !== undefined)
        .filter((sub) => !sub.closed)
        .forEach((sub) => sub.unsubscribe());
    }
  });

  it('should be created', inject([ThreatReportOverviewService], (service) => {
    expect(service).toBeTruthy();
  }));

  it('should group reports by workproduct', fakeAsync(inject([ThreatReportOverviewService, GenericApi], (service: ThreatReportOverviewService, api: GenericApi) => {
    expect(service).toBeDefined();
    expect(api).toBeDefined();
    const workproducts = ThreatReportMock.mockMany(2);
    const reports = ReportMock.mockMany(3);
    reports[0].attributes.metaProperties.work_products = [workproducts[0]];
    reports[1].attributes.metaProperties.work_products = [...workproducts];
    reports[2].attributes.metaProperties.work_products = [workproducts[1]];
    reports.push(undefined);

    const reportId1 = reports[0].id;
    const reportId2 = reports[1].id;
    const reportId3 = reports[2].id;
    const spy = spyOn(api, 'get').and.returnValue(Observable.of(reports));
    service.setGenericApiService(api);
    const threatReport$ = service.loadAll();
    expect(threatReport$).toBeDefined();
    const s$ = threatReport$.subscribe((arr) => {
      expect(arr).toBeDefined();
      // // did we group correctly?
      expect(arr.length).toEqual(2);
      expect(arr instanceof Array).toBeTruthy();
      // sorted by name?
      expect(arr[0].name <= arr[1].name).toBeTruthy();
      arr.forEach((tro) => {
        expect(tro instanceof ThreatReport).toBeTruthy();
      });

      expect(arr[0].reports.length).toEqual(2);
      expect(arr[1].reports.length).toEqual(2);

      expect(arr[0].reports.find((report) => report.id === reportId1)).toBeTruthy();
      expect(arr[0].reports.find((report) => report.id === reportId2)).toBeTruthy();

      expect(arr[1].reports.find((report) => report.id === reportId2)).toBeTruthy();
      expect(arr[1].reports.find((report) => report.id === reportId3)).toBeTruthy();
    });
    subscriptions.push(s$);
  })));
});
