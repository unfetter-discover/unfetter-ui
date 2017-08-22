
import { Component, OnInit } from '@angular/core';
import * as Ps from 'perfect-scrollbar';
import { MdDialog } from '@angular/material';
import { Constance } from '../../utils/constance';
import { AssessmentsService } from '../assessments.service';
import { Report } from '../../models/report';
import { ConfirmationDialogComponent } from '../../components/dialogs/confirmation/confirmation-dialog.component';

@Component({
  selector: 'assessments-list',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.css'],
})

export class AssessmentsListComponent implements OnInit {
  private pageTitle = 'Assessments';
  private pageIcon = Constance.REPORTS_ICON;
  private description =  'An assessment is a survey of the Courses of Actions that your organization implements, ' +
            'and to what level (High, Medium, or Low).  Unfetter|Discover will use the survey to help you ' +
            'understand your gaps, how important they are and which should be addressed.  You may create ' +
            'multiple reports to see how new or different Courses of Actions implemented may change your security posture.';

  private assessments = [];
  constructor( protected dialog: MdDialog, private assessmentsService: AssessmentsService) {
     assessmentsService.url = Constance.X_UNFETTER_ASSESSMENT_URL;
  }

  public ngOnInit() {
    this.assessmentsService.load(`sort=${JSON.stringify({ 'stix.created': -1 })}`).subscribe(
      (data) => {
         this.assessments = data;
      }
    );
  }

  private edit(item: any): void {
    console.dir(item);
  }

  private delete(item: any): void {
    let _self = this;
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: item });
    dialogRef.afterClosed().subscribe(
        (result) => {
        if (result === 'true') {
             let sub  = _self.assessmentsService.delete(item).subscribe(
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
