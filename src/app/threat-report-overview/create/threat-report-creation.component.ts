import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { GenericApi } from '../../core/services/genericapi.service';
import { Constance } from '../../utils/constance';
import { IntrusionSet } from '../../models/intrusion-set';
import { Malware } from '../../models/malware';
import { SelectOption } from '../models/select-option';
import { UploadService } from '../file-upload/upload.service';
import { ThreatReport } from '../models/threat-report.model';
import { ThreatReportSharedService } from '../services/threat-report-shared.service';
import { Boundaries } from '../models/boundaries';
import { SortHelper } from '../../global/static/sort-helper';
import { ModifyReportDialogComponent } from '../modify-report-dialog/modify-report-dialog.component';
import { Report } from '../../models/report';

@Component({
  selector: 'unf-threat-report-creation',
  templateUrl: './threat-report-creation.component.html',
  styleUrls: ['threat-report-creation.component.scss']
})
export class ThreatReportCreationComponent implements OnInit, OnDestroy {

  public shouldIncludeBoundaries = false;
  public intrusions: SelectOption[];
  public malware: SelectOption[];
  public maxStartDate;
  public minEndDate;
  public threatReport = new ThreatReport();
  public dateError = {
    startDate: { isError: false },
    endDate: { isError: false, isSameOrBefore: false, isSameOrBeforeMessage: 'End Date must be after Start Date.' },
    errorMessage: 'Not a valid date'
  };
  public readonly dateFormat = this.dateFormat;
  public readonly path = `threat-dashboard`;
  private readonly subscriptions = [];

  constructor(
    protected router: Router,
    protected location: Location,
    protected genericApi: GenericApi,
    protected dialog: MatDialog,
    protected sharedService: ThreatReportSharedService) { }

  /**
   * @description fetch data for this component
   * @returns {void}
   */
  public ngOnInit(): void {
    if (this.sharedService.threatReportOverview) {
      // Deep Clone
      this.clone();
      this.shouldIncludeBoundaries = !this.threatReport.boundaries.isEmpty();
    }
    const intrusionFilter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
    const instrusionUrl = `${Constance.INTRUSION_SET_URL}?${intrusionFilter}`;
    const o1$ = this.genericApi.get(instrusionUrl);
    const malwareFilter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
    const malwareUrl = `${Constance.MALWARE_URL}?${malwareFilter}`;
    const o2$ = this.genericApi.get(malwareUrl);
    const sub1$ = Observable.combineLatest(o1$, o2$, (s1, s2) => [s1, s2]).subscribe(
      (data) => {
        console.log(data);
        const intrusions: IntrusionSet[] = data[0];
        const malware: Malware[] = data[1];
        this.intrusions = intrusions
          .map((el) => {
            return { value: el.id, displayValue: el.attributes.name } as SelectOption;
          })
          .sort(SortHelper.sortDescByField('displayValue'));
        this.malware = malware
          .map((el) => {
            return { value: el.id, displayValue: el.attributes.name } as SelectOption;
          })
          .sort(SortHelper.sortDescByField('displayValue'));
      },
      (err) => console.log(err),
      () => console.log('fetch complete'));

    this.subscriptions.push(sub1$);
  }

  /**
   * @description clean up component
   */
  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  /**
   * @description handle start date changed, does validation
   * @param value
   */
  public startDateChanged(value: any): void {
    if (!value) {
      this.minEndDate = null;
      this.dateError.startDate.isError = false;
      this.dateError.endDate.isSameOrBefore = false;
      this.threatReport.boundaries.startDate = null;
    } else if (moment(value, this.dateFormat).isValid()) {
      this.threatReport.boundaries.startDate = moment(value, this.dateFormat).toDate();
      this.dateError.startDate.isError = false;
      const date = moment(value, this.dateFormat).add(1, 'd');
      this.minEndDate = new Date(date.year(), date.month(), date.date());
      this.isEndDateSameOrBeforeStartDate(value);
    } else {
      this.threatReport.boundaries.startDate = null;
      this.dateError.startDate.isError = true;
    }
  }

  /**
   * @description handle end date changed, does validation
   * @param value
   */
  public endDateChanged(value: any): void {
    if (!value) {
      this.dateError.endDate.isError = false;
      this.dateError.endDate.isSameOrBefore = false;
      this.threatReport.boundaries.endDate = null;
    } else if (moment(value, this.dateFormat).isValid()) {
      this.dateError.endDate.isError = false;
      this.threatReport.boundaries.endDate = moment(value, this.dateFormat).toDate();
      this.isEndDateSameOrBeforeStartDate(value);
    } else {
      this.threatReport.boundaries.endDate = null;
      this.dateError.endDate.isError = true;
      this.dateError.endDate.isSameOrBefore = false;

    }
  }

  /**
   * @description toggle the boundaries checkboxes show hide state
   * @param {UIEvent} $event
   * @returns {void}
   */
  public boundariesToggled($event?: UIEvent): void {
    const el = $event as any;
    if (el && el.checked !== undefined) {
      this.shouldIncludeBoundaries = el.checked;
    }
  }

  /**
   * @description add to selected malwares, add a chip
   * @param {string} value
   * @param {string} stixType
   */
  public addChip(value: any, stixType: string): void {
    if (!value || !stixType) {
      return;
    }

    let chips: Set<any> | undefined;
    switch (stixType) {
      case 'intrusion-set':
        chips = this.threatReport.boundaries.intrusions;
        break;
      case 'malware':
        chips = this.threatReport.boundaries.malware;
        break;
      case 'target':
        chips = this.threatReport.boundaries.targets;
        break;
    }

    if (chips) {
      if (typeof value === 'string') {
        chips = chips.add(value);
      } else {
        if (!this.hasValue(chips, value)) {
          chips = chips.add(value);
        }
      }
    }
  }

  /**
   * @description check if option.value is present in the given set
   * @param {Set<any>} chips
   * @param {{ value: any}} option
   * @return {boolean} true if found, otherwise false
   */
  public hasValue(chips: Set<any>, option: { value: any }): boolean {
    return chips.has(option.value);
  }

  /**
   * @description Remove a chip from the correct chip Set
   * @param {string} stixName
   * @param {string} stixType
   */
  public removeChip(stixName: any, stixType: string) {
    if (!stixName || !stixType) {
      return;
    }

    let chips;
    switch (stixType) {
      case 'intrusion-set':
        chips = this.threatReport.boundaries.intrusions;
        break;
      case 'malware':
        chips = this.threatReport.boundaries.malware;
        break;
      case 'target':
        chips = this.threatReport.boundaries.targets;
        break;
    }
    chips.delete(stixName);
  }

  /**
   * go back to list view
   * @param {UIEvent} event optional
   */
  public onCancel(event: UIEvent): void {
    this.location.back();
  }

  /**
   * @description
   * @param {UIEvent} event optional
   */
  public onContinue(event: UIEvent): void {
    // if the boundaries check box is checked, do not use boundaries provided
    if (this.isFalsey(this.shouldIncludeBoundaries)) {
      this.threatReport.boundaries = new Boundaries();
    }
    this.sharedService.threatReportOverview = this.threatReport;
    this.router.navigate([`/${this.path}/modify`, this.threatReport.id]);
  }

  /**
   * @description open add external report dialog
   * @param {UIEvent} event optional
   * @return {void}
   */
  // public openAddReportDialog(event?: UIEvent): void {
  //   const opts = {
  //     width: '800px',
  //     height: 'calc(100vh - 140px)'
  //   };
  //   this.dialog
  //     .open(ModifyReportDialogComponent, opts)
  //     .afterClosed()
  //     .subscribe((result: Partial<Report> | boolean) => {
  //       if (this.isFalsey(result)) {
  //         return;
  //       }
  //       // add new report, wrap in the expect data attribute, cause you know, jsonschema
  //       // const report = {
  //       //   data: result
  //       // };
  //       const report = result as Report;
  //       this.threatReport.reports.push(report);
  //     },
  //     (err) => console.log(err)
  //     );
  // }

  /**
   * @description 
   * @return true is string and true or boolean and true, otherwise false
   */
  private isTruthy(val: boolean | string = false): boolean {
    const isBool = typeof val === 'boolean';
    const isString = typeof val === 'string';
    return (isBool && val === true) || (isString && val === 'true');
  }

  /**
   * @description 
   * @return true is string and false or boolean and false, otherwise true
   */
  private isFalsey(val: boolean | string | Partial<Report> | undefined): boolean {
    const isUndefined = typeof val === 'undefined';
    const isBool = typeof val === 'boolean';
    const isString = typeof val === 'string';
    return isUndefined || (isBool && val === false) || (isString && val === 'false');
  }

  /**
   * @description
   * @return {void}
   */
  private isEndDateSameOrBeforeStartDate(value: any): void {
    if (moment(value, this.dateFormat).isValid() &&
      moment(this.threatReport.boundaries.endDate, this.dateFormat).isSameOrBefore(moment(this.threatReport.boundaries.startDate, this.dateFormat))) {
      this.dateError.endDate.isSameOrBefore = true;
    } else {
      this.dateError.endDate.isSameOrBefore = false;
    }
  }

  /**
   * @description deep clone `this.threatReportOverview` from this components `this.sharedService`
   * @return {void}
   */
  private clone(): void {
    // remember to new up an object, otherwise object method will not exist, using just an object literal copy
    const tmp = Object.assign(new ThreatReport(), JSON.parse(JSON.stringify(this.sharedService.threatReportOverview)));
    this.threatReport = tmp;
    // this.csvReports = [];
    // this is needed to make sure boundaries is acutally and object and not an object literal at runtime
    this.threatReport.boundaries = new Boundaries();
    this.threatReport.boundaries.intrusions = this.sharedService.threatReportOverview.boundaries.intrusions || new Set<{ any }>();
    this.threatReport.boundaries.targets = this.sharedService.threatReportOverview.boundaries.targets || new Set<string>();
    this.threatReport.boundaries.malware = this.sharedService.threatReportOverview.boundaries.malware || new Set<{ any }>();
    if (this.sharedService.threatReportOverview.boundaries.startDate) {
      this.threatReport.boundaries.startDate = new Date(this.sharedService.threatReportOverview.boundaries.startDate);
    }
    if (this.sharedService.threatReportOverview.boundaries.endDate) {
      this.threatReport.boundaries.endDate = new Date(this.sharedService.threatReportOverview.boundaries.endDate);
    }
  }
}
