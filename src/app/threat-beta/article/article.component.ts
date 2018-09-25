import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { ArticleForm } from '../../global/form-models/article';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public finishedLoadingAll$: Observable<boolean> = new BehaviorSubject(true).asObservable(); // TODO

  public failedToLoad = new BehaviorSubject(false).asObservable();
  public form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.resetForm();
  }

  private resetForm() {
    this.form = ArticleForm();
  }
}
