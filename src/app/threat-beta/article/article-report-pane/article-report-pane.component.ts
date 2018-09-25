import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'article-report-pane',
  templateUrl: './article-report-pane.component.html',
  styleUrls: ['./article-report-pane.component.scss']
})
export class ArticleReportPaneComponent implements OnInit {

  @Input()
  public form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
