import { Component, OnInit } from '@angular/core';
import { IndicatorSharingService } from '../indicator-sharing.service';

@Component({
    selector: 'indicator-sharing-list',
    templateUrl: 'indicator-sharing-list.component.html',
    styleUrls: ['indicator-sharing-list.component.scss']
})

export class IndicatorSharingListComponent implements OnInit {

    public filteredIndicators: any;
    public allIndicators: any;
    public DEFAULT_LENGTH: number = 5;
    public serverCallComplete: boolean = false;

    constructor(private indicatorSharingService: IndicatorSharingService) { }

    public ngOnInit() { 
        const getIndicators$ = this.indicatorSharingService.getIndicators()
            .subscribe(
                (results) => {
                    this.allIndicators = results.map((res) => res.attributes);
                    this.filteredIndicators = this.allIndicators.slice(0, this.DEFAULT_LENGTH);
                    this.serverCallComplete = true;
                },
                (err) => {
                    console.log(err);                    
                },
                () => {
                    getIndicators$.unsubscribe();
                }
            );
    }

    public showMoreIndicators() {
        const currentLength = this.filteredIndicators.length;
        this.filteredIndicators = this.filteredIndicators.concat(this.allIndicators.slice(currentLength, currentLength + this.DEFAULT_LENGTH));
    }

    public displayShowMoreButton() {
        if (!this.serverCallComplete || !this.filteredIndicators || this.filteredIndicators.length === 0) {
            return false;
        } else {
            return (this.filteredIndicators.length + this.DEFAULT_LENGTH) < this.allIndicators.length;
        }
    }
}
