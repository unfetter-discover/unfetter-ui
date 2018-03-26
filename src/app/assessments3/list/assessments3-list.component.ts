
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Ps from 'perfect-scrollbar';
import { MatDialog } from '@angular/material';
import { Constance } from '../../utils/constance';
import { Assessments3Service } from '../assessments3.service';
import { Report } from '../../models/report';
import { ConfirmationDialogComponent } from '../../components/dialogs/confirmation/confirmation-dialog.component';

@Component({
  selector: 'assessments3-list',
  templateUrl: './assessments3-list.component.html',
  styleUrls: ['./assessments3-list.component.scss'],
})

export class Assessments3ListComponent implements OnInit {

  public pageTitle = 'Assessments 3.0';
  public pageIcon = Constance.REPORTS_ICON;
  public description =  'This type of assessment consists of Threat Assessment, Architecture Analysis, and ' +
            ' Capabilities Analysis. It is designed to analyze adversary tradecraft, identify cybersecurity ' +
            ' gaps, prioritize capabilities, identify duplication, and provide investment decision options for ' +
            ' development and implementation of solutions';
  public assessments = [];

  constructor(
    public dialog: MatDialog,
    public assessments3Service: Assessments3Service,
    public router: Router,
    public route: ActivatedRoute) { }

  public ngOnInit() {
    // const sortObj = { 
    //   'stix.created': -1 
    // };
    // const projectObj = { 
    //   'stix.name': 1, 
    //   'stix.id': 1,
    //   'stix.created': 1,
    //   'stix.assessment_objects': { 
    //     '$slice': 1
    //   },
    //   'stix.assessment_objects.stix.type': 1
    // };
    // this.assessments3Service.load(`sort=${JSON.stringify(sortObj)}&project=${JSON.stringify(projectObj)}`).subscribe(
    //   (data) => {
    //      this.assessments = data;
    //   }
    // );
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
             const sub  = _self.assessments3Service.delete(item).subscribe(
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
