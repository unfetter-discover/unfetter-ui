import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'threat-report-creation',
  templateUrl: './threat-report-creation.component.html',
  styleUrls: ['threat-report-creation.component.scss']
})
export class ThreatReportCreationComponent implements OnInit, OnDestroy {

  public showCheckBoxes = true;
  private readonly subscriptions = [];

  constructor(protected router: Router) {}

  /**
   * @description fetch data for this component
   * @returns {void}
   */
  public ngOnInit(): void {
    // const sub$ = this.threatReportOverviewService
    //   .load()
    //   .subscribe((threatReports) => {
    //     this.threatReports = threatReports;
    //   },
    //   (err) => console.log(err),
    //   () => console.log('done'))

  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  /**
   * @description toggle the boundries checkboxes show hide state
   * @param {UIEvent} $event
   * @returns {void}
   */
  public boundriesToggled($event?: UIEvent): void {
    console.log($event);

    const el = $event as any;
    if (el && el.checked !== undefined) {
      this.showCheckBoxes = el.checked;
    }
  }
  
}
