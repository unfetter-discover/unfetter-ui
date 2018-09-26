import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public finishedLoadingAll$: Observable<boolean> = new BehaviorSubject(true).asObservable(); // TODO

  public failedToLoad = new BehaviorSubject(false).asObservable();
  constructor() { }

  ngOnInit() {
  }

}
