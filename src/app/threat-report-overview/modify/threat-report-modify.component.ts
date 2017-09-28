import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { GenericApi } from '../../global/services/genericapi.service';
import { Constance } from '../../utils/constance';
import { SortHelper } from '../../assessments/assessments-summary/sort-helper';
import { SelectOption } from './select-option';
import { IntrusionSet } from '../../models/intrusion-set';
import { Malware } from '../../models/malware';
import { ThreatReportMock } from '../models/threat-report-mock.model';
import { ThreatReportOverviewService } from '../threat-report-overview.service';
import { ThreatReport } from '../models/threat-report.model';

@Component({
  selector: 'threat-report-modify',
  templateUrl: './threat-report-modify.component.html',
  styleUrls: ['threat-report-modify.component.scss']
})
export class ThreatReportModifyComponent implements OnInit, OnDestroy {

  public threatReport: ThreatReport;
  private readonly subscriptions = [];

  constructor(protected route: ActivatedRoute,
              protected service: ThreatReportOverviewService) { }

  /**
   * @description fetch data for this component
   * @returns {void}
   */
  public ngOnInit(): void {
    console.log('on init');
    const id = this.route.snapshot.paramMap.get('id');
    const sub$ = this.service.load().subscribe((arr) => {
      this.threatReport = arr.filter((el) => el.id === Number(id))[0] || new ThreatReport();
    });
    this.subscriptions.push(sub$);
  }

  /**
   * @description clean up component
   */
  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
