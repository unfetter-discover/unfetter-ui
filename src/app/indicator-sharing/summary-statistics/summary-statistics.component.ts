
import {forkJoin as observableForkJoin,  Observable } from 'rxjs';

import {map} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { IndicatorSharingService } from '../indicator-sharing.service';
import { IndicatorSharingSummaryStatistics } from '../models/summary-statistics';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';
import { ChartData } from '../../global/models/chart-data';
import { Ng2ChartHelpers } from '../../global/static/ng2-chart-helpers';

interface OrgMostData {
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
    [key: string]: ChartData[]
  } = {};

  public readonly dataCategories: string[] = ['count', 'views', 'likes', 'comments'];

  public theMost: {
    [key: string]: OrgMostData
  } = {};
  public serverCallComplete: boolean = false;
  private identities: any[] = [];

  constructor(private indicatorSharingService: IndicatorSharingService) {
    this.dataCategories.forEach((dataCategory) => {
      this.barChartData[dataCategory] = [];
    });
  }

  ngOnInit() {
    const getStats$ = observableForkJoin(
      this.indicatorSharingService.getSummaryStatistics(), 
      this.indicatorSharingService.getIdentities().pipe(map(RxjsHelpers.mapArrayAttributes))
    )
      .subscribe(
        ([stats, identities]: [IndicatorSharingSummaryStatistics[], any[]]) => {
          this.serverCallComplete = true;
          this.identities = identities;
          this.buildCharts(stats);
          stats.forEach((stat: IndicatorSharingSummaryStatistics, i: number) => {
            this.dataCategories.forEach((dataCategory) => {
              if (i === 0 || stat[dataCategory] > this.theMost[dataCategory].number) {
                this.theMost[dataCategory] = {
                  org: this.getOrgName(stat._id),
                  number: stat[dataCategory],
                  index: i
                }
              }
            });
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
      tempBarChartData.count.push({ data: [stat.count], label: this.getOrgName(stat._id) });
      tempBarChartData.views.push({ data: [stat.views], label: this.getOrgName(stat._id) });
      tempBarChartData.likes.push({ data: [stat.likes], label: this.getOrgName(stat._id) });
      tempBarChartData.comments.push({ data: [stat.comments], label: this.getOrgName(stat._id) });
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
