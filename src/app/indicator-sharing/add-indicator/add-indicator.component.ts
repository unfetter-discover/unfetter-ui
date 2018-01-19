import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { IndicatorForm } from '../../global/form-models/indicator';
import { IndicatorSharingService } from '../indicator-sharing.service';
import { AuthService } from '../../core/services/auth.service';
import { heightCollapse } from '../../global/animations/height-collapse';

@Component({
    selector: 'add-indicator',
    templateUrl: 'add-indicator.component.html',
    styleUrls: ['add-indicator.component.scss'],
    animations: [heightCollapse]
})
export class AddIndicatorComponent implements OnInit {

    public form: FormGroup | any;
    public organizations: any;
    public attackPatterns: any[] = [];
    public includeQueries = {
        carElastic: true,
        carSplunk: true,
        cimSplunk: false
    };
    public stepOneControl: FormGroup | any;

    constructor(
        public dialogRef: MatDialogRef<any>,
        private indicatorSharingService: IndicatorSharingService,
        private authService: AuthService
    ) { }    

    public ngOnInit() {
        this.resetForm();

        const userId = this.authService.getUser()._id;
        const getData$ = Observable.forkJoin(
            this.indicatorSharingService.getIdentities(),
            this.indicatorSharingService.getUserProfileById(userId),
            this.indicatorSharingService.getAttackPatterns()
        ).subscribe(
            (res) => {       
                const identities = res[0].map((r) => r.attributes);
                const userOrgs = res[1].attributes.organizations;
                this.attackPatterns = res[2].map((r) => r.attributes);
                if (userOrgs && userOrgs.length) {
                    this.organizations = userOrgs
                        .filter((org) => org.approved)
                        .map((org) => identities.find((identity) => identity.id === org.id));   
                }                      
            },
            (err) => {
                console.log(err);
            },
            () => {
                getData$.unsubscribe();
            }
        );
    }

    public resetForm(e = null) {
        if (e) {
            e.preventDefault();
        }
        this.form = IndicatorForm(this.indicatorSharingService, true);
        this.stepOneControl = new FormGroup({
            name: this.form.get('name'),
            created_by_ref: this.form.get('created_by_ref'),
            valid_from: this.form.get('valid_from')
        });
    }

    public submitIndicator() {
        const tempIndicator = this.buildIndicator({}, this.form.value);

        this.pruneQueries(tempIndicator);        

        const addIndicator$ = this.indicatorSharingService.addIndicator(tempIndicator)
            .subscribe(
                (res) => {                   
                    this.resetForm();
                    this.dialogRef.close({
                        'indicator': res[0].attributes,
                        'newRelationships': (tempIndicator.metaProperties !== undefined && tempIndicator.metaProperties.relationships !== undefined)
                    });
                },
                (err) => {
                    console.log(err);                    
                },
                () => {
                    addIndicator$.unsubscribe();
                }
            );
    }

    private buildIndicator(tempIndicator, obj) {
        for (let prop in obj) {
            if (Array.isArray(obj[prop])) {
                if (obj[prop].length > 0) {
                    tempIndicator[prop] = [];
                    obj[prop].forEach((item, i) => {
                        if (item instanceof Object && !(item instanceof Date)) {
                            tempIndicator[prop].push(this.buildIndicator({}, item));
                        } else if (item) {
                            tempIndicator[prop].push(item);
                        }
                    });

                    if (tempIndicator[prop].length === 0) {
                        delete tempIndicator[prop];
                    }
                }
            } else {
                switch ((typeof obj[prop])) {
                    case 'object':
                        if (obj[prop] instanceof Date) {
                            tempIndicator[prop] = obj[prop];
                        } else if (obj[prop] && Object.keys(obj[prop]).length > 0) {
                            tempIndicator[prop] = {};
                            tempIndicator[prop] = this.buildIndicator({}, obj[prop]);
                        }                        
                        break;
                    default:
                        if (obj[prop]) {
                            tempIndicator[prop] = obj[prop];
                        }
                        break;                    
                }
            }
        }
        return tempIndicator;
    }

    private pruneQueries(tempIndicator) {
        if (!tempIndicator.metaProperties.queries.carElastic.include || !tempIndicator.metaProperties.queries.carElastic.query || tempIndicator.metaProperties.queries.carElastic.query.length === 0) {
            try {
                delete tempIndicator.metaProperties.queries.carElastic;
            } catch (e) { }
        }

        if (!tempIndicator.metaProperties.queries.carSplunk.include || !tempIndicator.metaProperties.queries.carSplunk.query || tempIndicator.metaProperties.queries.carSplunk.query.length === 0) {
            try {
                delete tempIndicator.metaProperties.queries.carSplunk;
            } catch (e) { }
        }

        if (!tempIndicator.metaProperties.queries.cimSplunk.include || !tempIndicator.metaProperties.queries.cimSplunk.query || tempIndicator.metaProperties.queries.cimSplunk.query.length === 0) {
            try {
                delete tempIndicator.metaProperties.queries.cimSplunk;
            } catch (e) { }
        }

        if (Object.keys(tempIndicator.metaProperties.queries).length === 0) {
            try {
                delete tempIndicator.metaProperties.queries;
            } catch (e) { }
        }      
    }
}
