import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { BaseStixComponent } from '../../../base-stix.component';
import { AttackPattern } from '../../../../models';
import { StixService } from '../../../stix.service';
import { Constance } from '../../../../utils/constance';

@Component({
  selector: 'attack-pattern',
  templateUrl: './attack-pattern.component.html',

})

export class AttackPatternComponent extends BaseStixComponent implements OnInit {

    public attackPattern: AttackPattern = new AttackPattern();
    public x_unfetter_sophistication_levels = [
          { id : 1, value: '1 - Novice' },
          { id : 2, value: '2 - Practicioner' },
          { id : 3, value: '3 - Expert' },
          { id : 4, value: '4 - Innovator' }
    ];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.ATTACK_PATTERN_URL;
    }

    public ngOnInit() {
       this.loadAttackPattern();
    }

    public editButtonClicked(): void {
        let link = ['../edit', this.attackPattern.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(): void {
        super.openDialog(this.attackPattern).subscribe(
            () => {
                this.location.back();
            }
        );
    }

    public loadAttackPattern(): void {
         let subscription =  super.get().subscribe(
            (data) => {
                this.attackPattern = data as AttackPattern;
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

    public saveButtonClicked(): Observable<any> {
        return Observable.create((observer) => {
               let subscription = super.save(this.attackPattern).subscribe(
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

    public getSophisticationLevel(id: number): string {
        let sophisticationLevel = this.x_unfetter_sophistication_levels.find(
            (sophistication) => {
                return sophistication.id === id;
            }
        );
        return sophisticationLevel ? sophisticationLevel.value : '';
    }

    public cleanWhitespace(inputString): string {
        return inputString ? inputString.replace(/(?:\r\n|\r|\n)/g, '<br>') : '';
    }
}
