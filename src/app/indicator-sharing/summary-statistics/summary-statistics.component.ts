import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IndicatorSharingService } from '../indicator-sharing.service';
import { IndicatorSharingSummaryStatistics } from '../models/summary-statistics';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';
import { ChartData } from '../../global/models/chart-data';
import { Ng2ChartHelpers } from '../../global/static/ng2-chart-helpers';

interface OrgNumber {
  org: string;
  number: number;
  index: number;
}

@Component({
  selector: 'indicator-sharing-summary-statistics',
  templateUrl: './summary-statistics.component.html',
  styleUrls: ['./summary-statistics.component.scss']
})
export class SummaryStatisticsComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 0
        }
      }]
    },
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public chartColors = Ng2ChartHelpers.chartColors;

  public barChartData: {
    indicators: ChartData[],
    views: ChartData[],
    likes: ChartData[],
    comments: ChartData[],
  } = {
      indicators: [],
      views: [],
      likes: [],
      comments: []
  };

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
        ([stats, identities]: [IndicatorSharingSummaryStatistics[], any[]]) => {
          this.serverCallComplete = true;
          this.identities = identities;
          this.buildCharts(stats);
          stats.forEach((stat: IndicatorSharingSummaryStatistics, i: number) => {
            if (i === 0) {
              this.mostIndicators = {
                org: this.getOrgName(stat._id),
                number: stat.count,
                index: i
              };
              this.mostViewed = {
                org: this.getOrgName(stat._id),
                number: stat.views,
                index: i
              };
              this.mostLiked = {
                org: this.getOrgName(stat._id),
                number: stat.likes,
                index: i
              };
              this.mostComments = {
                org: this.getOrgName(stat._id),
                number: stat.comments,
                index: i
              };
            } else {
              if (stat.count > this.mostIndicators.number) {
                this.mostIndicators = {
                  org: this.getOrgName(stat._id),
                  number: stat.count,
                  index: i
                };
              }
              if (stat.views > this.mostViewed.number) {
                this.mostViewed = {
                  org: this.getOrgName(stat._id),
                  number: stat.views,
                  index: i
                };
              }
              if (stat.likes > this.mostLiked.number) {
                this.mostLiked = {
                  org: this.getOrgName(stat._id),
                  number: stat.likes,
                  index: i
                };
              }
              if (stat.comments > this.mostComments.number) {
                this.mostComments = {
                  org: this.getOrgName(stat._id),
                  number: stat.comments,
                  index: i
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

  public getCardBorder(index: number): string {
    const color = Ng2ChartHelpers.getChartColorByIndex(index);
    return `2px solid ${color}`;
  }

  private buildCharts(stats: IndicatorSharingSummaryStatistics[]): void {
    const tempBarChartData = { ...this.barChartData };
    stats.forEach((stat: IndicatorSharingSummaryStatistics, i: number) => {
      tempBarChartData.indicators.push({ data: [stat.count], label: this.getOrgName(stat._id) });
      tempBarChartData.views.push({ data: [stat.views], label: this.getOrgName(stat._id) });
      tempBarChartData.likes.push({ data: [stat.likes], label: this.getOrgName(stat._id) });
      tempBarChartData.comments.push({ data: [stat.comments], label: this.getOrgName(stat._id) });
      console.log('####', stat.comments, '%%%%%', this.getOrgName(stat._id), '(((((', this.barChartData.comments);
    });
    this.barChartData = tempBarChartData;
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
