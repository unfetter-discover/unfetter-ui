import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Report, StixCoreEnum } from 'stix';

import { ThreatFeatureState } from '../../store/threat.reducers';
import { getSelectedReport } from '../../store/threat.selectors';

@Component({
  selector: 'article-report-pane',
  templateUrl: './article-report-pane.component.html',
  styleUrls: ['./article-report-pane.component.scss']
})
export class ArticleReportPaneComponent implements OnInit {

  @Input()
  public form: FormGroup;
  public report$: Observable<Report>;

  constructor(private store: Store<ThreatFeatureState>) { }

  ngOnInit() {
    this.report$ = this.store.select(getSelectedReport);
  }

  public quoteText(e: Selection, reportId, reportName) {
    const previousContent = this.form.get('content').value;
    const text = e.toString();
    const quote = text.replace(/\n/g, '\n> ');
    const newContent = `${previousContent}\n> ${quote}\n> (Citation: ${reportName})\n>\n`;
    this.form.get('content').patchValue(newContent);

    const sources: string[] = this.form.get('sources').value;
    if (!sources.includes(reportId)) {
      sources.push(reportId);
      this.form.get('sources').patchValue(sources);
    }
  }
}
