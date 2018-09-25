import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { pluck, distinctUntilChanged, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from '../../../root-store/app.reducers';
import { MasterConfig } from '../../../core/services/run-config.service';

@Component({
  selector: 'article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {
  
  @Input()
  public form: FormGroup;
  public blockAttachments$: Observable<boolean>;

  constructor(
    public location: Location,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.blockAttachments$ = this.store
      .select('config')
      .pipe(
        pluck('runConfig'),
        distinctUntilChanged<MasterConfig>(),
        map((cfg) => cfg.blockAttachments)
      );
  }  
}
