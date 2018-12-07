import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  @Input()
  public stix: any;
  
  @Output()
  public commentSubmitted = new EventEmitter();
  
  @Output()
  public replySubmitted = new EventEmitter();

  @Output()
  public cancelled = new EventEmitter();

  public commentText = '';

  constructor() { }

  ngOnInit() {
  }

}
