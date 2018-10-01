import { Component, OnInit, Input } from '@angular/core';
import { ThreatBoard } from 'stix/unfetter/threat-board';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const base = '/threat-beta';
    this.route.params.subscribe(params => {
      const id = params.id;
      this.feedLink = `${base}/${id}/feed`;
      this.boardLink = `${base}/${id}/board`;
      this.articleLink = `${base}/${id}/article`;
    });
  }

}
