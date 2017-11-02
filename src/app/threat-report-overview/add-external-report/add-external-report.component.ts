import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { ExternalReportForm } from './external-report-form';
import { MatDialogRef } from '@angular/material';
import { ThreatReportOverviewService } from '../../threat-dashboard/services/threat-report-overview.service';
import { ExternalReference } from '../../models/externalReference';

@Component({
  selector: 'unf-add-external-report',
  templateUrl: './add-external-report.component.html',
  styleUrls: ['add-external-report.component.scss']
})
export class AddExterernalReportComponent implements OnInit {

  public form: FormGroup | any;
  public loading = false;
  private readonly subscriptions = [];

  constructor(
    protected router: Router,
    protected dialogRef: MatDialogRef<any>,
  ) { }

  /**
   * @description
   * @returns {void}
   */
  public ngOnInit(): void {
    this.resetForm();
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
  public submitReport() {
    const tmp = this.buildReport(this.form.value);
    this.resetForm();
    this.dialogRef.close(tmp);
  }

  /**
   * @description build a report
   */
  private buildReport(form: any): ExternalReference {
    if (!form) { 
      return new ExternalReference();
    }

    const ref = Object.assign(new ExternalReference(), form);
    if (ref.url) {
      ref.external_url = ref.url;
    }
    return ref;
  }

}
