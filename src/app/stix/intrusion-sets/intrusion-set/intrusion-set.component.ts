import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { IntrusionSet } from '../../../models';

@Component({
    selector: 'intrusion-set',
    templateUrl: './intrusion-set.component.html'
})
export class IntrusionSetComponent extends BaseStixComponent implements OnInit {
    protected intrusionSet: IntrusionSet = new IntrusionSet();

     constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog, location);
        stixService.url = 'cti-stix-store-api/intrusion-sets';
    }

    public ngOnInit() {
        this.loadIntrusionSet();
    }

    public editButtonClicked(): void {
        let link = ['../edit', this.intrusionSet.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(): void {
        super.openDialog(this.intrusionSet);
    }

    protected saveButtonClicked(): Observable<any> {
        return Observable.create((observer) => {
               let subscription = super.save(this.intrusionSet).subscribe(
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

    protected loadIntrusionSet(): void {
        let subscription =  super.get().subscribe(
            (data) => {
                this.intrusionSet = data ? data as IntrusionSet : new IntrusionSet();
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
