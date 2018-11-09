import { Component, Input } from '@angular/core';
import { ThreatBoard } from 'stix/unfetter/threat-board';

@Component({
  selector: 'threat-header',
  templateUrl: './threat-header.component.html',
  styleUrls: ['./threat-header.component.scss']
})
export class ThreatHeaderComponent {

  @Input() public threat: ThreatBoard;
  @Input() public created: Date;
  public feedLink: string;
  public boardLink: string;
  public articleLink: string;
  private _boardId: string;
  private readonly BASE_URL = '/threat-beta';

  @Input() public set boardId(v: string) {
    // TODO for some reason, routerLinkActive doesn't update correctly
    this._boardId = v;
    this.feedLink = `${this.BASE_URL}/${this._boardId}/feed`;
    this.boardLink = `${this.BASE_URL}/${this._boardId}/board`;
    this.articleLink = `${this.BASE_URL}/${this._boardId}/article/new`;
  }

  public get boardId () { return this._boardId; }
}
