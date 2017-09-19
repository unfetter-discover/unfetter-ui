import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { ThreatActor } from '../../../../models';
import { Constance } from '../../../../utils/constance';

@Component({
    selector: 'threat-actors',
    templateUrl: './threat-actors.component.html'
})
export class ThreatActorsComponent extends BaseStixComponent implements OnInit {
    public threatActor = new ThreatActor();

     constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.THREAT_ACTORS_URL;
    }

    public ngOnInit() {
       this.loadThreatActor();
    }

    public editButtonClicked(): void {
        const link = ['../edit', this.threatActor.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(): void {
        super.openDialog(this.threatActor);
    }

    public saveButtonClicked(): Observable<any> {
        return Observable.create((observer) => {
               const subscription = super.save(this.threatActor).subscribe(
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

    public loadThreatActor(): void {
         const subscription =  super.get().subscribe(
            (data) => {
                this.threatActor = data as ThreatActor;
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
