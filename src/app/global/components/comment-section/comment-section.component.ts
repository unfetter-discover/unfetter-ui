import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  @Input()
  public stix: any;
  
  @Output()
  public submitted = new EventEmitter();

  @Output()
  public cancelled = new EventEmitter();

  public commentText = '';

  constructor() { }

  ngOnInit() {
  }

}
