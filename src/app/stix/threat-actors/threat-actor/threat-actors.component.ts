import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { ThreatActor } from '../../../models';

@Component({
    selector: 'threat-actors',
    templateUrl: './threat-actors.component.html'
})
export class TheatActorComponent extends BaseStixComponent implements OnInit {
    protected  threatActor: ThreatActor = new ThreatActor();

     constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog, location);
        stixService.url = this.threatActor.url;
    }

    public ngOnInit() {
       this.loadThreatActor();
    }

    public editButtonClicked(): void {
        let link = ['../edit', this.threatActor.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(): void {
        super.openDialog(this.threatActor);
    }

    protected saveButtonClicked(): Observable<any> {
        return Observable.create((observer) => {
               let subscription = super.save(this.threatActor).subscribe(
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

    protected loadThreatActor(): void {
         let subscription =  super.get().subscribe(
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
