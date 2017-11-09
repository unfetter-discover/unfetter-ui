import { Component, OnInit } from '@angular/core';

import { AdminService } from '../admin.service';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'site-usage',
    templateUrl: 'site-usage.component.html',
    styleUrls: ['site-usage.component.scss']
})

export class SiteUsageComponent implements OnInit {

    public lineChartData = [];
    public lineChartLabels = [];
    public lineChartOptions: any = {
        responsive: true,
        scales: {
            yAxes: [{
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'left',
                id: 'y-axis-1',
            }, {
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'right',
                id: 'y-axis-2',

                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            }],
        }
    };
    public lineChartColors = [
        {
            fill: false,
            borderColor: Constance.MAT_COLORS[Constance.MAT_GRAPH_COLORS[0]][500],
            backgroundColor: Constance.MAT_COLORS[Constance.MAT_GRAPH_COLORS[0]][500],
            pointBackgroundColor: Constance.MAT_COLORS[Constance.MAT_GRAPH_COLORS[0]][500],
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: Constance.MAT_COLORS[Constance.MAT_GRAPH_COLORS[0]][500],
            yAxisID: 'y-axis-1'
        },
        {
            fill: false,
            borderColor: Constance.MAT_COLORS[Constance.MAT_GRAPH_COLORS[1]][500],
            backgroundColor: Constance.MAT_COLORS[Constance.MAT_GRAPH_COLORS[1]][500],
            pointBackgroundColor: Constance.MAT_COLORS[Constance.MAT_GRAPH_COLORS[1]][500],
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: Constance.MAT_COLORS[Constance.MAT_GRAPH_COLORS[1]][500],
            yAxisID: 'y-axis-2',
        },
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';
    public showGraph: boolean = false;

    public usageData: any[];

    constructor(private adminService: AdminService) { }

    public ngOnInit() { 
        const getWebsiteVisits$ = this.adminService.getWebsiteVisits()
            .subscribe((res) => {
                    this.usageData = res;
                },
                (err) => {
                    console.log(err);            
                },
                () => {
                    getWebsiteVisits$.unsubscribe();
                }
            );

        const getWebsiteVisitsGraph$ = this.adminService.getWebsiteVisitsGraph(30)
            .subscribe((results) => {
                    this.lineChartLabels = results.map((res) => new Date(res._id).toLocaleDateString('en-US'));

                    const uniqueUsers = {
                        data: results.map((res) => res.users),
                        label: 'Unique Users'
                    };
                    this.lineChartData.push(uniqueUsers);

                    const appLoads = {
                        data: results.map((res) => res.appLoads),
                        label: 'Application Loads'
                    };
                    this.lineChartData.push(appLoads);
                    this.showGraph = true;
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    getWebsiteVisits$.unsubscribe();
                }
            );
    }
}
