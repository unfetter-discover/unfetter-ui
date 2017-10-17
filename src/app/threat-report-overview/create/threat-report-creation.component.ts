import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';

import { GenericApi } from '../../global/services/genericapi.service';
import { Constance } from '../../utils/constance';
import { SortHelper } from '../../assessments/assessments-summary/sort-helper';
import { IntrusionSet } from '../../models/intrusion-set';
import { Malware } from '../../models/malware';
import { SelectOption } from '../models/select-option';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { UploadService } from '../file-upload/upload.service';
import { ThreatReport } from '../models/threat-report.model';
import { ThreatReportSharedService } from '../services/threat-report-shared.service';
import { Boundries } from '../models/boundries';

@Component({
  selector: 'threat-report-creation',
  templateUrl: './threat-report-creation.component.html',
  styleUrls: ['threat-report-creation.component.scss']
})
export class ThreatReportCreationComponent implements OnInit, OnDestroy {

  @ViewChild('fileUpload')
  public fileUpload: FileUploadComponent;
  public showCheckBoxes = true;
  public intrusions: SelectOption[];
  public malware: SelectOption[];
  public maxStartDate;
  public minEndDate;
  public reports;
  public threatReport = new ThreatReport();
  public dateError = {
    startDate: { isError: false },
    endDate: { isError: false, isSameOrBefore: false, isSameOrBeforeMessage: 'End Date must be after Start Date.' },
    errorMessage: 'Not a valid date'
  };
  public readonly dateFormat = this.dateFormat;

  private readonly subscriptions = [];

  constructor(protected router: Router,
              protected location: Location,
              protected genericApi: GenericApi,
              protected sharedService: ThreatReportSharedService) { }

  /**
   * @description fetch data for this component
   * @returns {void}
   */
  public ngOnInit(): void {
    if (this.sharedService.threatReportOverview) {
      // Deep Clone
      this.clone();
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
      this.threatReport.boundries.startDate = null;
    } else if (moment(value, this.dateFormat).isValid()) {
      this.threatReport.boundries.startDate = moment(value, this.dateFormat).toDate();
      this.dateError.startDate.isError = false;
      const date = moment(value, this.dateFormat).add(1, 'd');
      this.minEndDate = new Date(date.year(), date.month(), date.date());
      this.isEndDateSameOrBeforeStartDate(value);
    } else {
      this.threatReport.boundries.startDate = null;
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
      this.threatReport.boundries.endDate = null;
    } else if (moment(value, this.dateFormat).isValid()) {
      this.dateError.endDate.isError = false;
      this.threatReport.boundries.endDate = moment(value, this.dateFormat).toDate();
      this.isEndDateSameOrBeforeStartDate(value);
    } else {
      this.threatReport.boundries.endDate = null;
      this.dateError.endDate.isError = true;
      this.dateError.endDate.isSameOrBefore = false;

    }
  }

  /**
   * @description toggle the boundries checkboxes show hide state
   * @param {UIEvent} $event
   * @returns {void}
   */
  public boundriesToggled($event?: UIEvent): void {
    const el = $event as any;
    if (el && el.checked !== undefined) {
      this.showCheckBoxes = el.checked;
    }
  }

  /**
   * @description add to selected malwares, add a chip
   * @param {string} value
   * @param {string} stixType
   */
  public addChip(value: string, stixType: string): void {
    if (!value || !stixType) {
      return;
    }

    let chips: Set<string> | undefined;
    switch (stixType) {
      case 'intrusion-set':
        chips = this.threatReport.boundries.intrusions;
        break;
      case 'malware':
        chips = this.threatReport.boundries.malware;
        break;
      case 'target':
        chips = this.threatReport.boundries.targets;
        break;
    }

    if (chips) {
      chips = chips.add(value);
    }
  }

  /**
   * @description Remove a chip from the correct chip Set
   * @param {string} stixName
   * @param {string} stixType
   */
  public removeChip(stixName: string, stixType: string) {
    if (!stixName || !stixType) {
      return;
    }

    let chips;
    switch (stixType) {
      case 'intrusion-set':
        chips = this.threatReport.boundries.intrusions;
        break;
      case 'malware':
        chips = this.threatReport.boundries.malware;
        break;
      case 'target':
        chips = this.threatReport.boundries.targets;
        break;
    }
    chips.delete(stixName);
  }

  /**
   * go back to list view
   * @param {UIEvent} event optional
   */
  public cancel(event: UIEvent): void {
    this.location.back();
  }

  /**
   * @description
   * @param {UIEvent} event optional
   */
  public save(event: UIEvent): void {
    this.threatReport.reports = this.reports || [];
    this.sharedService.threatReportOverview = this.threatReport;
    this.router.navigate([`/tro/modify`, this.threatReport.id]);
  }

  /**
   * @description recieve a fileParsed event
   * @param {UIEvent} event optional
   * @return {void}
   */
  public fileParsed(event?: UIEvent): void {
    console.log(`file parsed data`, event);
    this.reports = event;

  }

  /**
   * @description
   * @return {void}
   */
  private isEndDateSameOrBeforeStartDate(value: any): void {
    if (moment(value, this.dateFormat).isValid() && moment(this.threatReport.boundries.endDate, this.dateFormat).isSameOrBefore(moment(this.threatReport.boundries.startDate, this.dateFormat))) {
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
    this.reports = this.sharedService.threatReportOverview.reports || [];
    // this is needed to make sure boundries is acutally and object and not an object literal at runtime
    this.threatReport.boundries = new Boundries();
    this.threatReport.boundries.intrusions = this.sharedService.threatReportOverview.boundries.intrusions || new Set<string>();
    this.threatReport.boundries.targets = this.sharedService.threatReportOverview.boundries.targets || new Set<string>();
    this.threatReport.boundries.malware = this.sharedService.threatReportOverview.boundries.malware || new Set<string>();
    if (this.sharedService.threatReportOverview.boundries.startDate) {
      this.threatReport.boundries.startDate = new Date(this.sharedService.threatReportOverview.boundries.startDate);
    }
    if (this.sharedService.threatReportOverview.boundries.endDate) {
      this.threatReport.boundries.endDate = new Date(this.sharedService.threatReportOverview.boundries.endDate);
    }
  }
}
