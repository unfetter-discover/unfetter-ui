import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartData } from '../../global/models/chart-data';
import { Constance } from '../../utils/constance';
import { EventsService } from '../events.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'events-content',
  templateUrl: './events-content.component.html',
  styleUrls: ['./events-content.component.scss']
})
export class EventsContentComponent implements OnInit {
  readonly DEFAULT_CHART_DAYS: string;
  readonly BASE_TEN: number;
  readonly columnIds: string[];
  public readonly barChartData: ChartData[];
  public barChartLabels: string[];
  public barChartOptions: any;
  public barChartLegend: any;
  public readonly barChartType: string;
  public colors: any;
  public daysOfDataValue: string;

  public set daysOfData(newSelectedRisk: string) {
    this.daysOfDataValue = newSelectedRisk;
    this.updateChart();
  }

  public get daysOfData(): string {
    return this.daysOfDataValue;
  }

  constructor( public service: EventsService, private datePipe: DatePipe) {
    this.columnIds = ['date', 'ip', 'city', 'country', 'threat', 'attack_pattern', 'potential actor'];
    this.DEFAULT_CHART_DAYS = '7';
    this.BASE_TEN = 10;

    this.barChartData = [
      {
        data: [],
        label: 'Detected Threats',
        borderWidth: 0,
      },
    ]
    this.barChartType = 'bar';
  }

  ngOnInit() {
    this.barChartLabels = [];
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      },
      tooltips: {
        mode: 'index',
        // callbacks: {
        //   label: SophisticationBreakdownComponent.generateTooltipLabel,
        // }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          fontSize: 10,
        }
      }

    };
    this.barChartLegend = true;
    this.colors = [
      {
        backgroundColor: Constance.MAT_COLORS['green']['800']
      },
    ];
    this.daysOfData = this.DEFAULT_CHART_DAYS;
  }

  updateChart() {
    let earliest = new Date(new Date().setDate(new Date().getDate() - parseInt(this.daysOfData, this.BASE_TEN)));
    let inRangeSightings = this.service.recentSightings.reduce((result, sighting) => {
      if (new Date(sighting.attributes.last_seen) >= earliest) {
        result.push(sighting)
      }
      return result;
    }, []);
    let nonUniqueDateSightings = inRangeSightings.map((sighting) => this.datePipe.transform(sighting.attributes.last_seen, 'MMM dd'));
    let uniqueDateSightings = nonUniqueDateSightings.reduce((a, b) => (a[b] = a[b] + 1 || 1) && a, {});
    this.barChartLabels = Object.keys(uniqueDateSightings);
    this.barChartData[0].data = Object.values(uniqueDateSightings);
  }
}
