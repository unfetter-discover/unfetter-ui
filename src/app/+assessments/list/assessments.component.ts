
import { Component, OnInit } from '@angular/core';
import * as Ps from 'perfect-scrollbar';
import { MdDialog } from '@angular/material';
import { Constance } from '../../utils/constance';
import { AssessmentsService } from '../assessments.service';
import { Report } from '../../models/report';
import { ConfirmationDialogComponent } from '../../components/dialogs/confirmation/confirmation-dialog.component';

@Component({
  selector: 'assessments',
  templateUrl: './assessments.component.html',
})

export class AssessmentsComponent implements OnInit {
  private pageTitle = 'Assessments';
  private pageIcon = Constance.REPORTS_ICON;
  private description =  'An assessment is a survey of the Courses of Actions that your organization implements, ' +
            'and to what level (High, Medium, or Low).  Unfetter|Discover will use the survey to help you ' +
            'understand your gaps, how important they are and which should be addressed.  You may create ' +
            'multiple reports to see how new or different Courses of Actions implemented may change your security posture.';

  private reports: Report[] = [];
  constructor( protected dialog: MdDialog, private assessmentsService: AssessmentsService) {
     assessmentsService.url = Constance.REPORTS_URL;
  }

  public ngOnInit() {
    let filter = {
            'filter[order]': 'created DESC',
            'filter[where][labels]': 'assessment'
        };
    // let filter = 'filter[order]=name';
    this.assessmentsService.load(filter).subscribe(
      (data) => {
         this.reports = data as Report[];
      }
    );
  }

  private edit(): void {
    // conspe
  }

  private delete(item: any): void {
    let _self = this;
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: item });
    dialogRef.afterClosed().subscribe(
        (result) => {
        if (result) {
            // _self.assessmentsService.delete(item);
        }
    });
  }
}
