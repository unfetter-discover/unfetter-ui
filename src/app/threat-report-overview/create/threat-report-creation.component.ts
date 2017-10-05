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
    }
  }

  /**
   * go back to list view
   * @param {UIEvent} optional event
   */
  public cancel(event: UIEvent): void {
    this.router.navigate(['/tro']);
  }

  public save(event: UIEvent): void {
    console.log(event);
    console.log(this.fileUpload.value());

    // TODO: post to server,
    //  enctype='multipart/form-data'
    //      * https://stackoverflow.com/questions/39863317/how-to-force-angular2-to-post-using-x-www-form-urlencoded
    //       For Angular 4.3+ (New HTTPClient) use the following:

    //       let body = new URLSearchParams();
    //       body.set('user', username);
    //       body.set('password', password);

    //       let options = {
    //           headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    //       };

    //       this.http
    //           .post('//yourUrl.com/login', body.toString(), options)
    //           .subscribe(response => {
    //               //...
    //           });
    //           Note 3 things to make it work as expected:

    // Use URLSearchParams for your body
    // Convert body to string
    // Set the header's content-type
    // Attention: Older browsers do need a polyfill! I used: npm i url-search-params-polyfill --save and then added to polyfills.ts: import 'url-search-params-polyfill';
  }

}
