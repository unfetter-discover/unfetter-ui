import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter, Output, Inject, Input } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { MatSelectionList } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ExternalReportForm } from './external-report-form';
import { ThreatReportOverviewService } from '../../../threat-dashboard/services/threat-report-overview.service';
import { ExternalReference } from '../../../models/externalReference';
import { GenericApi } from '../../../core/services/genericapi.service';
import { AttackPattern } from '../../../models/attack-pattern';
import { Constance } from '../../../utils/constance';
import { ThreatReport } from '../../models/threat-report.model';
import { Report } from '../../../models/report';
import { Stix } from '../../../threat-dashboard/models/adapter/stix';

@Component({
  selector: 'unf-add-external-report',
  templateUrl: './add-external-report.component.html',
  styleUrls: ['add-external-report.component.scss']
})
export class AddExternalReportComponent implements OnInit, OnDestroy {

  @Input('attackPatterns')
  public attackPatterns: AttackPattern[];
  
  @Output()
  public onFormSubmit = new EventEmitter<Partial<Report> | boolean>();

  @ViewChild('attackPatternBlock')
  public attackPatternEl: MatSelectionList;

  public form: FormGroup | any;
  public loading = false;
  public showExternalReferences = false;
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
    const sub$ = this.loadAttackPatterns()
      .map((arr) => arr.sort(this.genAttackPatternSorter()))
      .subscribe(
      (val) => this.attackPatterns = val,
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
   * @description load attack patterns
   * @return {Observable<any>}
   */
  public loadAttackPatterns(): Observable<AttackPattern[]> {
    if (this.attackPatterns && this.attackPatterns.length > 0) {
      return Observable.of(this.attackPatterns);
    }

    const filter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
    const url = Constance.ATTACK_PATTERN_URL + '?' + filter;
    return this.genericApiService.get(url).map((el) => this.attackPatterns = el);
  }

  /**
   * @description reset the form controls
   * @param {Stix} stix optional
   * @return {void}
   */
  public resetForm(stixReport?: Stix): void {
    const report = stixReport;
    if (this.form && report) {
      // trigger a change detection
      requestAnimationFrame(() => {
        this.form.setValue({
          external_ref_name: report.external_references[0].external_id,
          external_ref_external_id: report.external_references[0].external_id,
          external_ref_description: report.external_references[0].description,
          external_ref_url:  report.external_references[0].url,
          external_ref_source_name: 'opensource',
          name: report.name || '',
          description: report.description,
          granular_markings: report.granular_markings,
          external_references: [],
          kill_chain_phases: [],
          object_refs: []
        });
      });
    } else {
      const form = ExternalReportForm();
      this.form = form;
    }
  }

  /**
   * @description reset this components form and emit a close event
   * @param event 
   * @return {void}
   */
  public resetFormAndClose(event?: UIEvent): void {
    if (event) {
      event.preventDefault();
    }
    this.resetForm();
    this.onFormSubmit.emit(false);
  }

  /**
   * @description submit a report
   */
  public submitReport(): Partial<Report> {
    const formData = this.buildReport(this.form.value);
    this.resetForm();
    // const data =
    //   {
    //     reports:
    //       [{
    //         data: {
    //           attributes: formData
    //         },
    //       }]
    //   } as Partial<ThreatReport>;
    const data = {
      attributes: formData
    } as Partial<Report>;
    console.log('emitting newly created report', data);
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

  /**
   * @description build a report
   */
  private buildReport(form: any): any {
    if (!form) {
      return {};
    }

    const ref: any = {};
    ref.name = form.name;
    ref.description = form.description;
    ref.created = new Date();
    ref.title = ref.name;
    // TODO: assign create_by_ref as current user if one exists

    // add external refs
    const name = form.external_ref_name;
    const source_name = form.external_ref_source_name;
    const external_id = form.external_ref_external_id;
    const description = form.external_ref_description;
    const url = form.external_ref_url;
    const externalRefs = [];
    const externalRef = {
      description,
      external_id,
      name,
      source_name,
      url
    };
    externalRefs.push(externalRef);
    ref.external_references = externalRefs;
    // add selected attack patterns
    const selected = this.attackPatternEl.selectedOptions.selected;
    const apIds = selected.map((selectedOpt) => selectedOpt.value);
    ref.object_refs = apIds;
    return ref;
  }

  /**
   * @description create a function to sort attackpatterns by name
   * @return {Function} (a: AttackPattern, b: AttackPattern) => number
   */
  private genAttackPatternSorter(): (a: AttackPattern, b: AttackPattern) => number {
    const sorter = (a: AttackPattern, b: AttackPattern) => {
      const val1 = a.attributes.name;
      const val2 = b.attributes.name;
      if (val1 > val2) {
        return 1;
      } else if (val1 < val2) {
        return -1;
      }
      return 0;
    };
    return sorter;
  }

}
