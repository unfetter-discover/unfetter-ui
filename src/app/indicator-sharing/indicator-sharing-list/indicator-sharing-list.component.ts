import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { IndicatorSharingService } from '../indicator-sharing.service';
import { AddIndicatorComponent } from '../add-indicator/add-indicator.component';

@Component({
    selector: 'indicator-sharing-list',
    templateUrl: 'indicator-sharing-list.component.html',
    styleUrls: ['indicator-sharing-list.component.scss']
})

export class IndicatorSharingListComponent implements OnInit, OnDestroy {

    public displayedIndicators: any;
    public allIndicators: any;
    public identities: any[];
    public filteredIndicators: any;
    public DEFAULT_LENGTH: number = 5;
    public serverCallComplete: boolean = false;
    public indicatorToAttackPatternMap: any = {};
    public searchParameters: any = {
        labels: [],
        activeLabels: []
    };

    constructor(private indicatorSharingService: IndicatorSharingService, public dialog: MatDialog) { }

    public ngOnInit() { 
        const getIdentities$ = this.indicatorSharingService.getIdentities()
            .subscribe(
                (res) => {
                    this.identities = res.map((r) => r.attributes);            
                },
                (err) => {
                    console.log(err);                
                },
                () => {
                    getIdentities$.unsubscribe();
                }
            );

        const getIndicators$ = this.indicatorSharingService.getIndicators()
            .subscribe(
                (results) => {
                    this.filteredIndicators = this.allIndicators = results.map((res) => res.attributes);                    
                    this.serverCallComplete = true;

                    this.setDisplayedIndicators();
                    this.setIndicatorSearchParameters();
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    getIndicators$.unsubscribe();
                }
            );

        const getAttackPatternsByIndicator$ = this.indicatorSharingService.getAttackPatternsByIndicator()
            .subscribe(
                (result) => {
                    result.attributes.forEach((res) => {
                        this.indicatorToAttackPatternMap[res._id] = res.attackPatterns;
                    });                              
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    getAttackPatternsByIndicator$.unsubscribe();
                }
            );
    }

    public ngOnDestroy() {
        this.dialog.closeAll();
    }

    public openDialog() {
        this.dialog.open(AddIndicatorComponent, {
            width: '800px',
            height: 'calc(100vh - 140px)'
        });
    }

    public filterLabelChange(e) {        
        this.searchParameters.activeLabels = e.value;
        if (this.searchParameters.activeLabels && this.searchParameters.activeLabels.length > 0) {
            this.filteredIndicators = this.allIndicators
                .filter((indicator) => {
                    if (indicator.labels !== undefined && indicator.labels.length > 0) {
                        let labelPresent = false;
                        indicator.labels
                            .forEach((label) => {
                                if (this.searchParameters.activeLabels.includes(label)) {
                                    labelPresent = true;
                                }
                            });
                        return labelPresent
                    } else {
                        return false;
                    }
                }); 
        } else {
            this.filteredIndicators = this.allIndicators;
        }            

        this.setDisplayedIndicators();
    }

    public setDisplayedIndicators() {
        this.displayedIndicators = this.filteredIndicators.slice(0, this.DEFAULT_LENGTH);
    }

    public setIndicatorSearchParameters() {        
        let labelSet: Set<string> = new Set();
        
        this.allIndicators
            .filter((indicator) => indicator.labels !== undefined && indicator.labels.length > 0)
            .map((indicator) => indicator.labels)
            .reduce((prev, cur) => prev.concat(cur), [])
            .forEach((label) => labelSet.add(label));
        
        this.searchParameters.labels = Array.from(labelSet);        
        this.searchParameters.activeLabels = this.searchParameters.labels.slice();
    }

    public showMoreIndicators() {
        const currentLength = this.displayedIndicators.length;
        this.displayedIndicators = this.displayedIndicators.concat(this.filteredIndicators.slice(currentLength, currentLength + this.DEFAULT_LENGTH));
    }

    public displayShowMoreButton() {
        if (!this.serverCallComplete || !this.displayedIndicators || this.displayedIndicators.length === 0) {
            return false;
        } else {
            return (this.displayedIndicators.length + this.DEFAULT_LENGTH) < this.filteredIndicators.length;
        }
    }

    public getAttackPatternsByIndicatorId(indicatorId) {
        return this.indicatorToAttackPatternMap[indicatorId] !== undefined ? this.indicatorToAttackPatternMap[indicatorId] : [];
    }

    public getIdentityNameById(createdByRef) {
        const identityMatch = this.identities && this.identities.length > 0 ? this.identities.find((identity) => identity.id === createdByRef) : null;
        
        if (identityMatch && identityMatch.name !== undefined) {
            return { id: identityMatch.id, name: identityMatch.name};
        } else {
            return false;
        }
    }
}
