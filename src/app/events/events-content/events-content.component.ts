import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortable } from '@angular/material';
import { Constance } from '../../utils/constance';
import { EventsService } from '../events.service';

@Component({
  selector: 'events-content',
  templateUrl: './events-content.component.html',
  styleUrls: ['./events-content.component.scss']
})
export class EventsContentComponent implements OnInit, AfterViewInit {
  readonly DEFAULT_CHART_DAYS: string;
  readonly columnIds: string[];
  public barChartOptions: any;
  public barChartLegend: any;
  public readonly barChartType: string;
  public colors: any;
  public daysOfDataValue: string;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public service: EventsService) {
    this.columnIds = ['last_seen', 'hostname', 'observed_data_refs_city', 'observed_data_refs_country', 'threat', 'attack_pattern', 'potential actor'];
    this.DEFAULT_CHART_DAYS = '7';

    this.barChartType = 'bar';
  }

  ngOnInit() {
    this.service.barChartLabels = [];
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
    this.service.daysOfData = this.DEFAULT_CHART_DAYS;
    this.sort = new MatSort();
    this.sort.sort(<MatSortable>{
      id: this.columnIds[0],
      start: 'desc',
    });
  }

  ngAfterViewInit() {
    this.service.dataSource.sort = this.sort;
  }

}
