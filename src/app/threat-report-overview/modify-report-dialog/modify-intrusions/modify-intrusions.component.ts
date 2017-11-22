import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter, Output, Inject, Input } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ThreatReportOverviewService } from '../../threat-dashboard/services/threat-report-overview.service';
import { IntrusionSet } from '../../../models/intrusion-set';
import { GenericApi } from '../../../core/services/genericapi.service';
import { ThreatReport } from '../../models/threat-report.model';
import { Constance } from '../../../utils/constance';
import { SelectOption } from '../../models/select-option';
import { SortHelper } from '../../../global/static/sort-helper';

@Component({
  selector: 'unf-modify-intrusions',
  templateUrl: './modify-intrusions.component.html',
  styleUrls: ['modify-intrusions.component.scss']
})
export class ModifyIntrusionsComponent implements OnInit, OnDestroy {

  @Input()
  public intrusions: SelectOption[];

  @Input()
  public threatReport: ThreatReport;

  @Output()
  public onFormSubmit = new EventEmitter<Partial<ThreatReport> | boolean>();

  public form: FormControl | any;
  public loading = false;
  private readonly subscriptions: Subscription[] = [];

  constructor(
    protected genericApiService: GenericApi,
  ) { }

  /**
   * @description
   * @returns {void}
   */
  public ngOnInit(): void {
    this.loading = true;
    this.resetForm();
    const sub$ = this.loadIntrusions()
      .subscribe(
      (val) => this.intrusions = val,
      (err) => console.log(err),
      () => this.loading = false
      );
    this.subscriptions.push(sub$);
  }

  /**
   * @description clean up this component
   */
  public ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
  }

  /**
   * @description load intrusions
   * @return {Observable<any>}
   */
  public loadIntrusions(): Observable<SelectOption[]> {
    if (this.intrusions && this.intrusions.length > 0) {
      return Observable.of(this.intrusions);
    }

    const filter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
    const url = Constance.INTRUSION_SET_URL + '?' + filter;
    return this.genericApiService.get(url).map((intrusions: IntrusionSet[]) => {
      return intrusions
        .map((el) => {
          return {
            value: el.id,
            displayValue: el.attributes.name
          } as SelectOption;
        })
        .sort(SortHelper.sortDescByField('displayValue'));
    });
  }

  /**
   * @description reset the form controls
   * @param {UIEvent} event optional
   * @return {void}
   */
  public resetForm(event?: UIEvent): void {
    if (event) {
      event.preventDefault();
    }
    this.form = new FormControl();
  }

  /**
   * @description reset this components form and emit a close event
   * @param event 
   * @return {void}
   */
  public resetFormAndClose(event?: UIEvent): void {
    this.resetForm(event);
    this.onFormSubmit.emit(false);
  }

  /**
   * @description submit a report
   */
  public submit(): Partial<ThreatReport> {
    const formData = this.form.value;
    this.resetForm();
    const data = {
      boundries: {
        intrusions: new Set(formData)
      },
    } as Partial<ThreatReport>;
    this.onFormSubmit.emit(data);
    return data;
  }

  /**
   * @description angular track by list function, uses the items id if
   *  it exists, otherwise uses the index
   * @param {number} index
   * @param {item}
   * @return {number}
   */
  public trackByFn(index: number, item: any): number {
    return item.id || index;
  }

}
