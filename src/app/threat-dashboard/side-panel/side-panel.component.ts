import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { Constance } from '../../utils/constance';
import { GenericApi } from '../../global/services/genericapi.service';
import { ThreatReport } from '../../threat-report-overview/models/threat-report.model';
import { SortHelper } from '../../assessments/assessments-summary/sort-helper';

@Component({
    selector: 'unf-side-panel',
    templateUrl: 'side-panel.component.html',
    styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit, OnDestroy {

    @Input('threatReport')
    public threatReport: ThreatReport;

    public readonly subscriptions: Subscription[] = [];

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected genericApi: GenericApi
    ) { }

    /**
     * @description init this component
     */
    public ngOnInit() {

    }

    /**
     * @description 
     */
    public ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        }
    }
}
