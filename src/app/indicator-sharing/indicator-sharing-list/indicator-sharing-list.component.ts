import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

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
    public organizations: any[];
    public filteredIndicators: any;
    public DEFAULT_LENGTH: number = 10;
    public serverCallComplete: boolean = false;
    public indicatorToAttackPatternMap: any = {};
    public searchParameters: any = {
        labels: [],
        activeLabels: [],
        activeIdentities: []
    };
    public SERVER_CALL_COMPLETE = false;
    public sortBy: string = 'NEWEST';
    public searchDebouncer: Subject<any> = new Subject();

    constructor(private indicatorSharingService: IndicatorSharingService, public dialog: MatDialog) { }

    public ngOnInit() { 
        const getData$ = Observable.forkJoin(
            this.indicatorSharingService.getIdentities(),
            this.indicatorSharingService.getIndicators(),
            this.indicatorSharingService.getAttackPatternsByIndicator()
        ).subscribe(
            (results) => {
                // Identities
                this.identities = results[0].map((r) => r.attributes); 

                this.organizations = this.identities.filter((identity) => identity.identity_class === 'organization');

                // Indicators
                this.allIndicators = results[1].map((res) => res.attributes);

                this.filterIndicators();
                this.setIndicatorSearchParameters();         
                
                // Attack patterns
                results[2].attributes.forEach((res) => {
                    this.indicatorToAttackPatternMap[res._id] = res.attackPatterns;
                }); 
            },
            (err) => {
                console.log(err);
            },
            () => {
                this.SERVER_CALL_COMPLETE = true;
                getData$.unsubscribe();
            }
        );

        const searchEvents$ = this.searchDebouncer
            .debounceTime(300)
            .subscribe(
                () => this.filterIndicators(),
                (e) => console.log(e),
                () => searchEvents$.unsubscribe()
            );
    }

    public ngOnDestroy() {
        this.dialog.closeAll();
    }

    public updateIndicator(newIndicatorState) {
        const indicatorIndex = this.allIndicators
            .map((indicator) => indicator.id)
            .indexOf(newIndicatorState.id);

        if (indicatorIndex > -1) {
            this.allIndicators[indicatorIndex] = newIndicatorState
        } else {
            console.log('Can not find indicator to update');
        }
    }

    public openDialog() {
        const dialogRef = this.dialog.open(AddIndicatorComponent, {
            width: '800px',
            height: 'calc(100vh - 50px)'
        });

        const dialogRefClose$ = dialogRef.afterClosed()
            .subscribe((res) => {
                    if (res) {
                        this.allIndicators.push(res);
                        this.filterIndicators();
                    }
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    dialogRefClose$.unsubscribe();
                }
            );
    }

    public filterIndicators() {
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

        if (this.searchParameters.activeIdentities && this.searchParameters.activeIdentities.length > 0) {
            this.filteredIndicators = this.filteredIndicators
                .filter((indicator) => indicator.created_by_ref !== undefined && this.searchParameters.activeIdentities.includes(indicator.created_by_ref));
        }
        this.sortIndicators();           
    }

    public sortByArrayLengthHelper(a, b, field) {
        if (a[field] && !b[field]) {
            return -1;
        } else if (!a[field] && b[field]) {
            return 1;
        } else if (a[field] && b[field]) {
            return b[field].length - a[field].length;
        }
    }

    public sortIndicators() {
        switch (this.sortBy) {
            case 'NEWEST':
                this.filteredIndicators = this.filteredIndicators.sort((a, b) => {
                    return (new Date(b.created) as any) - (new Date(a.created) as any);
                });
                break;
            case 'OLDEST':
                this.filteredIndicators = this.filteredIndicators.sort((a, b) => {
                    return (new Date(a.created) as any) - (new Date(b.created) as any);
                });
                break;
            case 'LIKES':
                this.filteredIndicators = this.filteredIndicators.sort((a, b) => this.sortByArrayLengthHelper(a, b, 'likes'));
                break;
            case 'COMMENTS':
                this.filteredIndicators = this.filteredIndicators.sort((a, b) => this.sortByArrayLengthHelper(a, b, 'comments'));
                break;
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
    }

    public showMoreIndicators() {
        const currentLength = this.displayedIndicators.length;
        this.displayedIndicators = this.displayedIndicators.concat(this.filteredIndicators.slice(currentLength, currentLength + this.DEFAULT_LENGTH));
    }

    public displayShowMoreButton() {
        if (!this.SERVER_CALL_COMPLETE || !this.displayedIndicators || this.displayedIndicators.length === 0) {
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
