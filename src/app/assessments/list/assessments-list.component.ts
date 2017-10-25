
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Ps from 'perfect-scrollbar';
import { MatDialog } from '@angular/material';
import { Constance } from '../../utils/constance';
import { AssessmentsService } from '../assessments.service';
import { Report } from '../../models/report';
import { ConfirmationDialogComponent } from '../../components/dialogs/confirmation/confirmation-dialog.component';

@Component({
  selector: 'assessments-list',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.scss'],
})

export class AssessmentsListComponent implements OnInit {

  public pageTitle = 'Assessments';
  public pageIcon = Constance.REPORTS_ICON;
  public description =  'An assessment is a survey of the Courses of Actions that your organization implements, ' +
            'and to what level (High, Medium, or Low).  Unfetter|Discover will use the survey to help you ' +
            'understand your gaps, how important they are and which should be addressed.  You may create ' +
            'multiple reports to see how new or different Courses of Actions implemented may change your security posture.';
  public assessments = [];

  constructor(
    public dialog: MatDialog,
    public assessmentsService: AssessmentsService,
    public router: Router,
    public route: ActivatedRoute) { }

  public ngOnInit() {
    this.assessmentsService.load(`sort=${JSON.stringify({ 'stix.created': -1 })}`).subscribe(
      (data) => {
         this.assessments = data;
      }
    );
  }

  public edit(item: any): void {
     const type = item.attributes.assessment_objects[0].stix.type;
     const link = ['wizard/edit', type, item.id];
     this.router.navigate(link, { relativeTo: this.route });
  }

  public delete(item: any): void {
    const _self = this;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: item });
    dialogRef.afterClosed().subscribe(
        (result) => {
        if (result === 'true' || result === true) {
             const sub  = _self.assessmentsService.delete(item).subscribe(
               (d) => {
                 this.assessments = this.assessments.filter((a) => a.id !== item.id);
               }, (err) => {
                 console.log('err');
               }, () => {
                  sub.unsubscribe();
               }
             );
        }
    });
  }
}
