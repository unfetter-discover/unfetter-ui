import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  public name: string;
  public intrusions: SelectOption[];
  public malware: SelectOption[];
  public startDate;
  public endDate;
  public minStartDate;
  public maxStartDate;
  public minEndDate;
  public reports;
  public readonly selectedInstrusions = new Set<string>();
  public readonly selectedMalware = new Set<string>();
  public readonly selectedTargets = new Set<string>();
  public dateError = {
    startDate: { isError: false },
    endDate: { isError: false, isSameOrBefore: false, isSameOrBeforeMessage: 'End Date must be after Start Date.' },
    errorMessage: 'Not a valid date'
  }

  private readonly subscriptions = [];

  constructor(protected router: Router,
              protected genericApi: GenericApi,
              protected sharedService: ThreatReportSharedService) { }

  /**
   * @description fetch data for this component
   * @returns {void}
   */
  public ngOnInit(): void {
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
    } else if (moment(value, 'MM/DD/YYYY').isValid()) {
      this.startDate = moment(value, 'MM/DD/YYYY').toDate();
      this.dateError.startDate.isError = false;
      const date = moment(value, 'MM/DD/YYYY').add(1, 'd');
      this.minEndDate = new Date(date.year(), date.month(), date.date());
      this.isEndDateSameOrBeforeStartDate(value);
    } else {
      this.dateError.startDate.isError = true;
    }
  }

  public endDateChanged(value: any): void {
    if (!value) {
      this.dateError.endDate.isError = false;
      this.dateError.endDate.isSameOrBefore = false;
    } else if (moment(value, 'MM/DD/YYYY').isValid()) {
      this.dateError.endDate.isError = false;
      this.endDate = moment(value, 'MM/DD/YYYY').toDate();
      this.isEndDateSameOrBeforeStartDate(value);
    } else {
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
   * @description add to targets, add a chip
   * @param {UIEvent} event - optional
   */
  public addTarget(event?: UIEvent): void {
    if (!event || !event.target) {
      return;
    }

    let val = (event.target as any).value;
    val = val.trim() || '';
    if (val.length === 0) {
      return;
    }
    this.selectedTargets.add(val);
  }

  /**
   * @description add to selected set, add a chip
   * @param {UIEvent} event - optional
   */
  public addSelectedIntrusionSet(event?: UIEvent): void {
    const ev = event as any;
    if (!ev || !ev.value) {
      return;
    }

    const id = ev.value;
    const options = this.intrusions.filter((el) => el.value === id);
    if (!options || options.length < 1) {
      console.log('did not find selected option!');
      return;
    }

    options
      .map((el) => {
        const v = el.displayValue;
        this.selectedInstrusions.add(v);
      });
  }

  /**
   * @description add to selected malwares, add a chip
   * @param {UIEvent} event - optional
   */
  public addSelectedMalware(event?: UIEvent): void {
    const ev = event as any;
    console.log(ev);
    if (!ev || !ev.value) {
      return;
    }

    const id = ev.value;
    const options = this.malware.filter((el) => el.value === id);
    if (!options || options.length < 1) {
      console.log('did not find selected option!');
      return;
    }

    options
      .map((el) => {
        const v = el.displayValue;
        this.selectedMalware.add(v);
      });

  }

  /**
   * Remove a chip
   * @param {string} stixName
   * @param {string} stixType
   */
  public removeChip(stixName: string, stixType: string) {
    switch (stixType) {
      case 'intrusion-set':
        this.selectedInstrusions.delete(stixName);
        break;
      case 'malware':
        this.selectedMalware.delete(stixName);
        break;
      case 'target':
        this.selectedTargets.delete(stixName);
        break;
    }
  }

  /**
   * go back to list view
   * @param {UIEvent} event optional
   */
  public cancel(event: UIEvent): void {
    this.router.navigate(['/tro']);
  }

  /**
   * @description
   * @param {UIEvent} event optional
   */
  public save(event: UIEvent): void {
    console.log(event);
    console.log(this.fileUpload.value());

    // const id = UUID.v4();
    const tro = new ThreatReport();
    tro.name = this.name;
    if (this.showCheckBoxes) {
      tro.boundries.intrusions = this.selectedInstrusions;
      tro.boundries.malware = this.selectedMalware;
      tro.boundries.targets = this.selectedTargets;
      tro.boundries.startDate = this.startDate;
      tro.boundries.endDate = this.endDate;
    }
    tro.reports = this.reports || [];
    this.sharedService.threatReportOverview = tro;
    this.router.navigate([`/tro/modify`, tro.id]);
  }

  /**
   * @description recieve a fileParsed event
   */
  public fileParsed(event): void {
    console.log(`file parsed data`, event);
    this.reports = event;

  }

  private isEndDateSameOrBeforeStartDate(value: any): void {
    if (moment(value, 'MM/DD/YYYY').isValid() && moment(this.endDate, 'MM/DD/YYYY').isSameOrBefore(moment(this.startDate, 'MM/DD/YYYY')) ) {
      this.dateError.endDate.isSameOrBefore = true;
    } else {
      this.dateError.endDate.isSameOrBefore = false;
    }
  }

}
