import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { IndicatorForm } from '../../global/form-models/indicator';
import { IndicatorSharingService } from '../indicator-sharing.service';
import { AuthService } from '../../global/services/auth.service';

@Component({
    selector: 'add-indicator',
    templateUrl: 'add-indicator.component.html',
    styleUrls: ['add-indicator.component.scss'],
    animations: [
        trigger('collapseLevel', [
            transition(':enter', [
                style({ opacity: 0, height: 0, overflow: 'hidden' }),
                animate('0.2s ease-in-out', style({ opacity: 1, height: '*' }))
            ]),
            transition(':leave', [
                style({ opacity: 1, height: '*', overflow: 'hidden' }),
                animate('0.2s ease-in-out', style({ opacity: 0, height: 0 }))
            ])
        ])
    ]
})
export class AddIndicatorComponent implements OnInit {

    public form: FormGroup | any;
    public organizations: any;

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
            this.indicatorSharingService.getUserProfileById(userId)
        ).subscribe(
            (res) => {       
                const identities = res[0].map((r) => r.attributes);
                const userOrgs = res[1].attributes.organizations;
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
        this.form = IndicatorForm();
    }

    public submitIndicator() {
        const tempIndicator = this.buildIndicator({}, this.form.value);
        const addIndicator$ = this.indicatorSharingService.addIndicator(tempIndicator)
            .subscribe(
                (res) => {                   
                    this.resetForm();
                    this.dialogRef.close(res[0].attributes);
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
}
