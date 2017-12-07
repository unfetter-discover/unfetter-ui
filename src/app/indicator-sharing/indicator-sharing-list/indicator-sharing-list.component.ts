import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { IndicatorSharingService } from '../indicator-sharing.service';
import { AddIndicatorComponent } from '../add-indicator/add-indicator.component';
import { ConfigService } from '../../core/services/config.service';

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
    public searchParametersInitialState: any = {
        labels: [],
        activeLabels: [],
        activeIdentities: [],
        killChainPhases: [],
        activeKillChainPhases: [],
        activeSensorIds: [],
        indicatorName: ''
    };
    public searchParameters: any = { ...this.searchParametersInitialState };
    public SERVER_CALL_COMPLETE = false;
    public sortBy: string = 'NEWEST';
    public searchDebouncer: Subject<any> = new Subject();
    public sensors: any[];
    public indicatorToSensorMap: any = {};

    constructor(
        private indicatorSharingService: IndicatorSharingService, 
        public dialog: MatDialog,
        private configService: ConfigService
    ) { }

    public ngOnInit() { 
        const getData$ = Observable.forkJoin(
            this.indicatorSharingService.getIdentities(),
            this.indicatorSharingService.getIndicators(),
            this.indicatorSharingService.getAttackPatternsByIndicator(),
            this.indicatorSharingService.getSensors()
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

                // Sensors with observed data paths
                this.sensors = results[3].map((r) => r.attributes)
                this.buildIndicatorToSensorMap();
            },
            (err) => {
                console.log(err);
            },
            () => {
                this.SERVER_CALL_COMPLETE = true;
                getData$.unsubscribe();
            }
        );

        this.configService.getConfigPromise()
            .then((res) => {
                const attackKillchain = res.killChains.find((kc) => kc.name === 'mitre-attack');
                this.searchParameters.killChainPhases = attackKillchain.phase_names;
            })
            .catch((err) => {
                console.log(err);
            });

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
                        this.allIndicators.push(res.indicator);
                        if (res.newRelationships) {
                            const getPatterns$ = this.indicatorSharingService.getAttackPatternsByIndicator()
                                    .subscribe((patternsRes) => {
                                        patternsRes.attributes.forEach((e) => {
                                            this.indicatorToAttackPatternMap[e._id] = e.attackPatterns;
                                        });
                                    },
                                    (err) => {
                                        console.log(err);
                                    },
                                    () => {
                                        getPatterns$.unsubscribe();
                                    }
                                );
                        }                        
                        this.buildIndicatorToSensorMap();
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

        if (this.searchParameters.activeKillChainPhases && this.searchParameters.activeKillChainPhases.length > 0) {
            this.filteredIndicators = this.filteredIndicators
                .filter((indicator) => !!indicator.kill_chain_phases)
                .filter((indicator) => {
                    let found = false;
                    indicator.kill_chain_phases.map((e) => e.phase_name).forEach((phase) => {
                        if (this.searchParameters.activeKillChainPhases.includes(phase)) {
                            found = true;
                        }
                    });
                    return found;
                });
        }
        
        if (this.searchParameters.indicatorName && this.searchParameters.indicatorName !== '') {
            this.filteredIndicators = this.filteredIndicators
                .filter((indicator) => !!indicator.name)
                .filter((indicator) => indicator.name.toLowerCase().indexOf(this.searchParameters.indicatorName.toLowerCase()) > -1);
        }

        if (this.searchParameters.activeSensorIds && this.searchParameters.activeSensorIds.length > 0) {
            this.filteredIndicators = this.filteredIndicators
                .filter((indicator) => indicator.metaProperties && indicator.metaProperties.observedData && Object.keys(this.indicatorToSensorMap).includes(indicator.id))
                .filter((indicator) => this.indicatorToSensorMap[indicator.id]
                    .map((sensor) => sensor.id)
                    .filter((sensorId) => this.searchParameters.activeSensorIds.includes(sensorId)).length > 0
                );
        }

        this.sortIndicators();           
    }

    public sortByArrayLengthHelper(a, b, field) {
        if (a.metaProperties && a.metaProperties[field] && (!b.metaProperties[field] || !b.metaProperties)) {
            return -1;
        } else if ((!a.metaProperties || !a.metaProperties[field]) && b.metaProperties && b.metaProperties[field]) {
            return 1;
        } else if (a.metaProperties && a.metaProperties[field] && b.metaProperties && b.metaProperties[field]) {
            return b.metaProperties[field].length - a.metaProperties[field].length;
        } else {
            return 0;
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

    public clearSearchParamaters() {
        this.searchParameters.activeLabels = []; 
        this.searchParameters.activeIdentities = []; 
        this.searchParameters.activeKillChainPhases = [];
        this.searchParameters.activeSensorIds = [];
        this.searchParameters.indicatorName = '';
        this.filterIndicators();
    }

    public getSensorsByIndicatorId(indicatorId) {
        if (Object.keys(this.indicatorToSensorMap).includes(indicatorId)) {
            return this.indicatorToSensorMap[indicatorId];
        } else {
            return null;
        }
    }

    private buildIndicatorToSensorMap() {
        const indicatorsWithObservedData = this.allIndicators.filter((indicator) => indicator.metaProperties && indicator.metaProperties.observedData);

        indicatorsWithObservedData.forEach((indicator) => {   
            const matchingSensorsSet = new Set();

            indicator.metaProperties.observedData.forEach((obsData) => {

                const sensorsFilter = this.sensors
                    .filter((sensor) => {
                        let retVal = false;
                        sensor.metaProperties.observedData.forEach((sensorObsData) => {
                            if (sensorObsData.name === obsData.name && sensorObsData.action === obsData.action && sensorObsData.property === obsData.property) {
                                retVal = true;
                            }
                        });
                        return retVal;
                    })
                    .forEach((sensor) => matchingSensorsSet.add(sensor));
            });

            const matchingSensors = Array.from(matchingSensorsSet);

            if (matchingSensors.length) {
                this.indicatorToSensorMap[indicator.id] = matchingSensors;
            }
        });
    }
}
