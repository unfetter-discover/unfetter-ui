import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { IntrusionSet } from '../../../../models';
import { Constance } from '../../../../utils/constance';

@Component({
    selector: 'intrusion-set',
    templateUrl: './intrusion-set.component.html'
})
export class IntrusionSetComponent extends BaseStixComponent implements OnInit {
    public intrusionSet: IntrusionSet = new IntrusionSet();

     constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar: MatSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.INTRUSION_SET_URL;
    }
    public getChipInfo(chipInfo): void {
        this.selectedExternal = chipInfo;
    }
    public ngOnInit() {
        this.loadIntrusionSet();
    }

    public editButtonClicked(): void {
        const link = ['../edit', this.intrusionSet.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(): void {
        super.openDialog(this.intrusionSet).subscribe(
            () => {
                this.location.back();
            }
        );
    }

    public saveButtonClicked(): Observable<any> {
        return Observable.create((observer) => {
               const subscription = super.save(this.intrusionSet).subscribe(
                    (data) => {
                        observer.next(data);
                        observer.complete();
                    }, (error) => {
                        // handle errors here
                        console.log('error ' + error);
                    }, () => {
                        // prevent memory links
                        if (subscription) {
                            subscription.unsubscribe();
                        }
                    }
                );
        });
    }

    public loadIntrusionSet(): void {
        const subscription =  super.get().subscribe(
            (data) => {
                this.intrusionSet = new IntrusionSet(data);
                let filter = 'filter=' + encodeURIComponent(JSON.stringify({ target_ref: this.intrusionSet.id }));
                // this.loadRelationships(filter);

                filter = 'filter=' + encodeURIComponent(JSON.stringify({ source_ref: this.intrusionSet.id }));
                // this.loadRelationships(filter);
            }, (error) => {
                // handle errors here
                 console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (subscription) {
                    subscription.unsubscribe();
                }
            }
        );
    }
}
