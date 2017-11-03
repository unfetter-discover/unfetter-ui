import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter, Output, trigger, state, animate, transition, style } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { ExternalReportForm } from './external-report-form';
import { MatDialogRef, MatSelectionList } from '@angular/material';
import { ThreatReportOverviewService } from '../../threat-dashboard/services/threat-report-overview.service';
import { ExternalReference } from '../../models/externalReference';
import { GenericApi } from '../../global/services/genericapi.service';
import { AttackPattern } from '../../models/attack-pattern';
import { Constance } from '../../utils/constance';
import { Subscription } from 'rxjs';
import { SortHelper } from '../../assessments/assessments-summary/sort-helper';

@Component({
  selector: 'unf-add-external-report',
  templateUrl: './add-external-report.component.html',
  styleUrls: ['add-external-report.component.scss'],
  animations: [
    trigger('collapseLevel', [
      state('open', style({ opacity: 1, height: '*' })),
      state('closed', style({ opacity: 0, height: 0 })),
      transition('open <=> closed', animate('200ms ease-in-out')),
    ])
  ]
})
export class AddExterernalReportComponent implements OnInit, OnDestroy {

  @ViewChild('attackPatternBlock')
  public attackPatternEl: MatSelectionList;

  public form: FormGroup | any;
  public loading = false;
  public showExternalReferences = false;
  public attackPatterns = [];
  private readonly subscriptions: Subscription[] = [];

  constructor(
    protected router: Router,
    protected genericApiService: GenericApi,
    public dialogRef: MatDialogRef<any>,
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
    const filter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
    const url = Constance.ATTACK_PATTERN_URL + '?' + filter;
    return this.genericApiService.get(url).map((el) => this.attackPatterns = el);
  }

  /**
   * @description reset the form controls
   * @return {void}
   */
  public resetForm(e = null): void {
    if (e) {
      e.preventDefault();
    }
    this.form = ExternalReportForm();
  }

  /**
   * @description submit a report
   */
  public submitReport(): void {
    const tmp = this.buildReport(this.form.value);
    this.resetForm();
    this.dialogRef.close(tmp);
  }

  /**
   * @description angular 2 track by list function, uses the items id if
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
    const external_url = form.external_ref_url;
    const externalRefs = [];
    const externalRef =  {
      description,
      external_id,
      name,
      source_name,
      external_url
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
   * @description change nested form names to their database names
   * @param form
   * @return form
   */
  // private fixNames(form: any): any {
  //   form.name = form.external_ref_name;
  //   form.source_name = form.external_ref_source_name;
  //   form.external_id = form.external_ref_external_id;
  //   form.description = form.external_ref_description;
  //   form.external_url = form.external_ref_url;
  //   const cleanup = [ 'external_ref_name', 'external_ref_url',
  //      'external_ref_description', 'external_ref_source_name', 'external_ref_external_id'];
  //   cleanup.forEach((attr) => delete form[attr]);
  //   return form;
  // }

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
