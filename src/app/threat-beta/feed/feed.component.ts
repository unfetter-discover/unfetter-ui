import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public finishedLoadingAll$: Observable<boolean> = new BehaviorSubject(true).asObservable(); // TODO

  public failedToLoad = new BehaviorSubject(false).asObservable();
  constructor() { }

  ngOnInit() {
  }

}
