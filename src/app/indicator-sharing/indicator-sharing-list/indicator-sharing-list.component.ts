import { Component, OnInit } from '@angular/core';
import { IndicatorSharingService } from '../indicator-sharing.service';

@Component({
    selector: 'indicator-sharing-list',
    templateUrl: 'indicator-sharing-list.component.html',
    styleUrls: ['indicator-sharing-list.component.scss']
})

export class IndicatorSharingListComponent implements OnInit {

    public filteredIndciators: any;
    constructor(private indicatorSharingService: IndicatorSharingService) { }

    public ngOnInit() { 
        const getIndicators$ = this.indicatorSharingService.getIndicators()
            .subscribe(
                (results) => {
                    this.filteredIndciators = results.map((res) => {
                        let temp = res.attributes;
                        temp.selectedIndex = 0;
                        return temp;
                    });
                },
                (err) => {
                    console.log(err);                    
                },
                () => {
                    getIndicators$.unsubscribe();
                }
            );
    }

    public onTabChange(e: Event) {
        console.log(e);
        
    }
}
