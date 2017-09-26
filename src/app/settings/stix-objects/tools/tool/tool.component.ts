import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { AttackPattern, KillChainPhase, Tool } from '../../../../models';
import { StixService } from '../../../stix.service';
import { BaseStixComponent } from '../../../base-stix.component';
import { Constance } from '../../../../utils/constance';

@Component({
  selector: 'tool',
  templateUrl: './tool.component.html',

})

export class ToolComponent extends BaseStixComponent implements OnInit {
   public tool: Tool = new Tool();
   constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.TOOL_URL;
    }

    public ngOnInit() {
      this.loadTool();
    }

    public editButtonClicked(): void {
        let link = ['../edit', this.tool.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(): void {
        super.openDialog(this.tool).subscribe(
            () => {
                this.location.back();
            }
        );
    }

    public saveButtonClicked(): Observable<any> {
        return Observable.create((observer) => {
               let subscription = super.save(this.tool).subscribe(
                    (data) => {
                        this.location.back();
                        // observer.next(data);
                        // observer.complete();
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

    public loadTool(): void {
      let sub = super.get().subscribe(
        (data) => {
          this.tool =  new Tool(data);
        }, (error) => {
                // handle errors here
                 console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (sub) {
                    sub.unsubscribe();
                }
            }
      );
    }
}
