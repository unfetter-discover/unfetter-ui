import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MitigateComponent } from '../mitigates/mitigate.component';
import { StixService } from '../../../stix.service';
import { Relationship, CourseOfAction } from '../../../../models';
import { Constance } from '../../../../utils/constance';

@Component({
  selector: 'mitigates-list',
  templateUrl: './mitigate-list.component.html'
})
export class MitigateListComponent extends MitigateComponent implements OnInit {
    public pageTitle = Constance.RELATIONSHIPS_TYPE;
    public pageIcon = Constance.RELATIONSHIPS_ICON;
    public targets: any[] = [];
    public count = -1;

     constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar: MatSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
    }

    public ngOnInit() {
       let sub = this.route.params.subscribe((params) => {
                if (params['type'] === Constance.COURSE_OF_ACTION_TYPE) {
                        this.stixService.url = Constance.COURSE_OF_ACTION_URL;
                        let subscription =  super.load().subscribe(
                            (data) => {
                                this.targets = data as CourseOfAction[];
                                super.loadAttachPatteren();
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
            },
            (error) => { console.log(error); },
            () => { sub.unsubscribe(); }
        );
    }

    public onTabShow(event: any): void {console.log('');  }

    public trackByFn(index: number, item: any): number {
        item.index = index;
        console.log( item.index);
        return  item.index;
    }
}
