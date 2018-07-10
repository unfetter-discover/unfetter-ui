
import { map } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';

import { GenericApi } from '../../../core/services/genericapi.service';
import { Constance } from '../../../utils/constance';
import { RxjsHelpers } from '../../static/rxjs-helpers';

@Component({
  selector: 'relatationship-generator',
  templateUrl: './relatationship-generator.component.html',
  styleUrls: ['./relatationship-generator.component.scss']
})
export class RelatationshipGeneratorComponent implements OnInit {

  @Input() public model: any;
  @Input() public relatedObjectType: string = 'attack-pattern';
  public canidateObjs: any[] = [];

  private readonly multiplesUrl: string = Constance.MULTIPLES_URL;

  constructor(private genericApi: GenericApi) { }

  ngOnInit() {
    this.getRelatedCanidates();
  }

  private getRelatedCanidates() {
    const filterStr = encodeURI(JSON.stringify({ 'stix.type': this.relatedObjectType }));
    const projectStr = encodeURI(JSON.stringify({ 'stix.name': 1, 'stix.id': 1 }));

    const getCanidateObjs$ = this.genericApi.get(`${this.multiplesUrl}?filter=${filterStr}&project=${projectStr}`).pipe(
      map(RxjsHelpers.mapArrayAttributes))
      .subscribe(
        (canidateObjs: any[]) => {
          this.canidateObjs = canidateObjs;
        },
        (err) => {
          console.log(err);
        },
        () => {
          if (getCanidateObjs$) {
            getCanidateObjs$.unsubscribe();
          }
        }
      );
  }

}
