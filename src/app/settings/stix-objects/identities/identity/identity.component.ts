import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar } from '@angular/material';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { Identity } from '../../../../models';

@Component({
  selector: 'identity',
  templateUrl: './identity.component.html',
})
export class IdentityComponent extends BaseStixComponent implements OnInit {

    protected identity: Identity = new Identity();

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = this.identity.url;
    }

    public ngOnInit() {
        this.loadIdentity();
    }

    public editButtonClicked(): void {
        let link = ['../edit', this.identity.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(): void {
        super.openDialog(this.identity);
    }

     protected addRemoveSector(sector: string) {
        if ( this.foundSector(sector) ) {
            this.identity.attributes.sectors = this.identity.attributes.sectors.filter((s) => s !== sector);
        } else {
            this.identity.attributes.sectors.push(sector);
        }
    }

     protected loadIdentity(): void {
        let subscription =  super.get().subscribe(
            (data) => {
                this.identity = data as Identity;

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

    protected saveButtonClicked(): Observable<any> {
        return Observable.create((observer) => {
               let subscription = super.save(this.identity).subscribe(
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

    protected foundSector(sector: string): boolean {
        let found = this.identity.attributes.sectors.find((s) => {
            return s === sector;
        });
        return found ? true : false;
    }
}
