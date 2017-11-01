import { Component, OnInit } from '@angular/core';

import { AdminService } from '../admin.service';

@Component({
    selector: 'site-usage',
    templateUrl: 'site-usage.component.html',
    styleUrls: ['site-usage.component.scss']
})

export class SiteUsageComponent implements OnInit {

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
    }
}
