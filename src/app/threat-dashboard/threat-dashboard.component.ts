import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Constance } from '../utils/constance';
import { StixService } from '../settings/stix.service';
import { BaseStixService } from '../settings/base-stix.service';
import { BaseComponentService } from '../components/base-service.component';
import { GenericApi } from '../global/services/genericapi.service';

import { IntrusionSetComponent } from '../intrusion-set/intrusion-set.component';
import { IntrusionSet } from '../models';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { ThreatReport } from '../threat-report-overview/models/threat-report.model';

@Component({
  selector: 'threat-dashboard',
  templateUrl: 'threat-dashboard.component.html',
  styleUrls: ['./threat-dashboard.component.scss']
})
export class ThreatDashboardComponent implements OnInit {

  public threatReport: ThreatReport;
  public id = '';
  public loading = true;
  public treeSpinner: boolean = false;
  public readonly subscriptions: Subscription[] = [];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected genericApi: GenericApi,
    protected threatReportService: ThreatReportOverviewService
  ) { }

  /**
   * @description init this component
   */
  public ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id && this.id.trim() !== '') {
      console.log('id is', this.id);
      this.threatReportService
        .load(this.id)
        .subscribe(
          (el) => this.threatReport = el,
          (err) => console.log(err),
          () => setTimeout(() => this.loading = false, 0));
    } else {
      setTimeout(() => this.loading = false, 0);
    }
  }

}
