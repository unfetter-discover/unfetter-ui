import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public finishedLoadingAll$: Observable<boolean> = new BehaviorSubject(true).asObservable(); // TODO

  public failedToLoad = new BehaviorSubject(false).asObservable();
  constructor() { }

  ngOnInit() {
  }

}
