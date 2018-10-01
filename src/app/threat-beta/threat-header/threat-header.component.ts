import { Component, OnInit, Input } from '@angular/core';
import { ThreatBoard } from 'stix/unfetter/threat-board';

@Component({
  selector: 'threat-header',
  templateUrl: './threat-header.component.html',
  styleUrls: ['./threat-header.component.scss']
})
export class ThreatHeaderComponent implements OnInit {

  @Input() public threat: ThreatBoard;
  @Input() public boardId: string;
  @Input() public created: Date;
  public feedLink: string;
  public boardLink: string;
  public articleLink: string;

  constructor() { }

  ngOnInit() {
    const base = '/threat-beta';
    this.feedLink = `${base}/${this.boardId}/feed`;
    this.boardLink = `${base}/${this.boardId}/board`;
    this.articleLink = `${base}/${this.boardId}/article`;
  }

}
