import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IndicatorSharingService } from '../indicator-sharing.service';
import { IndicatorSharingSummaryStatistics } from '../models/summary-statistics';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';

interface OrgNumber {
  org: string;
  number: number;
}

@Component({
  selector: 'indicator-sharing-summary-statistics',
  templateUrl: './summary-statistics.component.html',
  styleUrls: ['./summary-statistics.component.scss']
})
export class SummaryStatisticsComponent implements OnInit {

  public mostIndicators: OrgNumber;
  public mostViewed: OrgNumber;
  public mostLiked: OrgNumber;
  public mostComments: OrgNumber;
  public serverCallComplete: boolean = false;
  private identities: any[] = [];

  constructor(private indicatorSharingService: IndicatorSharingService) {}

  ngOnInit() {
    const getStats$ = Observable.forkJoin(
      this.indicatorSharingService.getSummaryStatistics(), 
      this.indicatorSharingService.getIdentities().map(RxjsHelpers.mapArrayAttributes)
    )
      .subscribe(
        ([stats, identities]: [IndicatorSharingSummaryStatistics[], any]) => {
          this.serverCallComplete = true;
          this.identities = identities;
          stats.forEach((stat: IndicatorSharingSummaryStatistics, i: number) => {
            if (i === 0) {
              this.mostIndicators = {
                org: this.getOrgName(stat._id),
                number: stat.count
              };
              this.mostViewed = {
                org: this.getOrgName(stat._id),
                number: stat.views
              };
              this.mostLiked = {
                org: this.getOrgName(stat._id),
                number: stat.likes
              };
              this.mostComments = {
                org: this.getOrgName(stat._id),
                number: stat.comments
              };
            } else {
              if (stat.count > this.mostIndicators.number) {
                this.mostIndicators = {
                  org: this.getOrgName(stat._id),
                  number: stat.count
                };
              }
              if (stat.views > this.mostViewed.number) {
                this.mostViewed = {
                  org: this.getOrgName(stat._id),
                  number: stat.views
                };
              }
              if (stat.likes > this.mostLiked.number) {
                this.mostLiked = {
                  org: this.getOrgName(stat._id),
                  number: stat.likes
                };
              }
              if (stat.comments > this.mostComments.number) {
                this.mostComments = {
                  org: this.getOrgName(stat._id),
                  number: stat.comments
                };
              }
            }
          });
        },
        (err) => {
          console.log(err);
        },
        () => {
          if (getStats$) {
            getStats$.unsubscribe();
          }
        }
      );
  }

  private getOrgName(orgId: string): string {
    const findOrg = this.identities.find((identity) => identity.id === orgId);
    if (findOrg) {
      return findOrg.name;
    } else {
      return 'Unknown';
    }
  }

}
