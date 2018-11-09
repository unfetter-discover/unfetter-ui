import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ReportForm } from '../../global/form-models/report';

@Component({
  selector: 'report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {

  public form: FormGroup = ReportForm();
  public editMode = false;

  constructor(public location: Location) { }

  ngOnInit() {
  }

  private resetForm() {
    this.form = ReportForm();
  }

}
