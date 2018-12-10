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
  public commentSubmitted = new EventEmitter<string>();
  
  @Output()
  public replySubmitted = new EventEmitter<{ commentId: string, reply: string }>();

  @Output()
  public cancelled = new EventEmitter<null>();

  public commentText = '';

  constructor() { }

  ngOnInit() {
    console.log('~~~~\n', this.stix);
  }

}
