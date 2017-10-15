import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { GenericApi } from '../../global/services/genericapi.service';
import { Constance } from '../../utils/constance';
import { SortHelper } from '../../assessments/assessments-summary/sort-helper';
import { IntrusionSet } from '../../models/intrusion-set';
import { Malware } from '../../models/malware';
import { SelectOption } from '../models/select-option';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { UploadService } from '../file-upload/upload.service';

// const UUID = require('uuid');
import * as UUID from 'uuid';
import * as moment from 'moment';
import { ThreatReport } from '../models/threat-report.model';
import { ThreatReportSharedService } from '../services/threat-report-shared.service';

@Component({
  selector: 'threat-report-creation',
  templateUrl: './threat-report-creation.component.html',
  styleUrls: ['threat-report-creation.component.scss']
})
export class ThreatReportCreationComponent implements OnInit, OnDestroy {

  @ViewChild('fileUpload')
  public fileUpload: FileUploadComponent;
  public showCheckBoxes = true;
  // public name: string;
  public intrusions: SelectOption[];
  public malware: SelectOption[];
  // public startDate;
  // public endDate;
  public maxStartDate;
  public minEndDate;
  public reports;
  // public readonly selectedInstrusions = new Set<string>();
  // public readonly selectedMalware = new Set<string>();
  // public readonly selectedTargets = new Set<string>();
  public threatReport = new ThreatReport();
  public dateError = {
    startDate: { isError: false },
    endDate: { isError: false, isSameOrBefore: false, isSameOrBeforeMessage: 'End Date must be after Start Date.' },
    errorMessage: 'Not a valid date'
  }

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
    if ( this.sharedService.threatReportOverview ) {
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

  public startDateChanged(value: any): void {
    if (!value) {
      this.minEndDate = null;
      this.dateError.startDate.isError = false;
      this.dateError.endDate.isSameOrBefore = false;
      this.threatReport.boundries.startDate = null;
    } else if (moment(value, 'MM/DD/YYYY').isValid()) {
      this.threatReport.boundries.startDate = moment(value, 'MM/DD/YYYY').toDate();
      this.dateError.startDate.isError = false;
      const date = moment(value, 'MM/DD/YYYY').add(1, 'd');
      this.minEndDate = new Date(date.year(), date.month(), date.date());
      this.isEndDateSameOrBeforeStartDate(value);
    } else {
      this.threatReport.boundries.startDate = null;
      this.dateError.startDate.isError = true;
    }
  }

  public endDateChanged(value: any): void {
    if (!value) {
      this.dateError.endDate.isError = false;
      this.dateError.endDate.isSameOrBefore = false;
      this.threatReport.boundries.endDate = null;
    } else if (moment(value, 'MM/DD/YYYY').isValid()) {
      this.dateError.endDate.isError = false;
      this.threatReport.boundries.endDate = moment(value, 'MM/DD/YYYY').toDate();
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
   * @param {UIEvent} event - optional
   */
  public addChip(value: any, stixType: string): void {
    let chips = new Set<string>();
    switch (stixType) {
      case 'intrusion-set':
        if (!this.threatReport.boundries.intrusions) {
          this.threatReport.boundries.intrusions = chips;
        }
        chips = this.threatReport.boundries.intrusions;
        break;
      case 'malware':
        if (!this.threatReport.boundries.malware) {
          this.threatReport.boundries.malware = chips;
        }
        chips = this.threatReport.boundries.malware;
        break;
      case 'target':
        if (!this.threatReport.boundries.targets) {
          this.threatReport.boundries.targets = chips;
        }
        chips = this.threatReport.boundries.targets;
        break;
    }
    chips.add(value);
  }

  /**
   * Remove a chip
   * @param {string} stixName
   * @param {string} stixType
   */
  public removeChip(stixName: string, stixType: string) {
    switch (stixType) {
      case 'intrusion-set':
        this.threatReport.boundries.intrusions.delete(stixName);
        break;
      case 'malware':
        this.threatReport.boundries.malware.delete(stixName);
        break;
      case 'target':
        this.threatReport.boundries.targets.delete(stixName);
        break;
    }
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
    console.log(event);
    console.log(this.fileUpload.value());

    // const id = UUID.v4();
    // const tro = new ThreatReport();
    // tro.name = this.name;
    // if (this.showCheckBoxes) {
    //   tro.boundries.intrusions = this.selectedInstrusions;
    //   tro.boundries.malware = this.selectedMalware;
    //   tro.boundries.targets = this.selectedTargets;
    //   tro.boundries.startDate = this.startDate;
    //   tro.boundries.endDate = this.endDate;
    // }
    this.threatReport.reports = this.reports || [];
    this.sharedService.threatReportOverview = this.threatReport;
    // this.router.navigate([`/tro/modify`, tro.id]);
    this.location.back();
  }

  /**
   * @description recieve a fileParsed event
   */
  public fileParsed(event): void {
    console.log(`file parsed data`, event);
    this.reports = event;

  }

  private isEndDateSameOrBeforeStartDate(value: any): void {
    if (moment(value, 'MM/DD/YYYY').isValid() && moment(this.threatReport.boundries.endDate, 'MM/DD/YYYY').isSameOrBefore(moment(this.threatReport.boundries.startDate, 'MM/DD/YYYY')) ) {
      this.dateError.endDate.isSameOrBefore = true;
    } else {
      this.dateError.endDate.isSameOrBefore = false;
    }
  }

  private clone(): void {
    this.threatReport = JSON.parse(JSON.stringify(this.sharedService.threatReportOverview));

    this.threatReport.boundries.intrusions = this.sharedService.threatReportOverview.boundries.intrusions ?
    new Set(this.sharedService.threatReportOverview.boundries.intrusions) : new Set<string>();

    this.threatReport.boundries.targets = this.sharedService.threatReportOverview.boundries.targets ?
    new Set(this.sharedService.threatReportOverview.boundries.targets) : new Set<string>();

    this.threatReport.boundries.malware = this.sharedService.threatReportOverview.boundries.malware ?
    new Set(this.sharedService.threatReportOverview.boundries.malware) : new Set<string>();
    if ( this.sharedService.threatReportOverview.boundries.startDate ) {
      this.threatReport.boundries.startDate = new Date(this.sharedService.threatReportOverview.boundries.startDate);
    }
    if ( this.sharedService.threatReportOverview.boundries.endDate ) {
      this.threatReport.boundries.endDate = new Date(this.sharedService.threatReportOverview.boundries.endDate);
    }
  }
}
