import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ArticleForm } from '../../global/form-models/article';
import { AppState } from '../../root-store/app.reducers';
import * as utilityActions from '../../root-store/utility/utility.actions';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  constructor(
    // TODO update state to feature state when ngrx is added
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new utilityActions.HideFooter());
    this.resetForm();
  }
  
  ngOnDestroy() {
    this.store.dispatch(new utilityActions.ShowFooter());
  }

  private resetForm() {
    this.form = ArticleForm();
  }
}
