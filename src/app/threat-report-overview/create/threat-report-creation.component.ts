import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { GenericApi } from '../../global/services/genericapi.service';
import { Constance } from '../../utils/constance';
import { SortHelper } from '../../assessments/assessments-summary/sort-helper';
import { SelectOption } from './select-option';
import { IntrusionSet } from '../../models/intrusion-set';
import { Malware } from '../../models/malware';

@Component({
  selector: 'threat-report-creation',
  templateUrl: './threat-report-creation.component.html',
  styleUrls: ['threat-report-creation.component.scss']
})
export class ThreatReportCreationComponent implements OnInit, OnDestroy {

  public showCheckBoxes = true;
  public intrusions: SelectOption[];
  public malware: SelectOption[];
  public readonly selectedInstrusions = new Set<string>();
  public readonly selectedMalware = new Set<string>();
  public readonly selectedTargets = new Set<string>();
  private readonly subscriptions = [];

  constructor(protected router: Router,
              protected genericApi: GenericApi) { }

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

  /**
   * @description add to targets, add a chip
   * @param {UIEvent} event - optional 
   */
  public addTarget(event?: UIEvent): void {
    console.log(event);
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
    console.log(ev);
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

}
