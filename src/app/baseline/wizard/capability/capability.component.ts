import { Component, EventEmitter, OnInit, Output, NgModule, ViewEncapsulation, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as assessReducers from '../../store/baseline.reducers';
import { Capability, ObjectAssessment } from 'stix/assess/v3';

@Component({
  selector: 'unf-baseline-wizard-capability',
  templateUrl: './capability.component.html',
  encapsulation: ViewEncapsulation.None, 
  styleUrls: ['./capability.component.scss']
})
export class CapabilityComponent implements OnInit {

  pageToggle: number = 2;    // 1 for heatmap, 2 for pdr score picker

  public attackMatrix: string = 'Att&ck Matrix';
  public noAttackPatterns: string = 'You have no Attack Patterns yet';
  public addAttackPatterns: string = 'Add a Kill Chain Phase and Attack Patterns and they will show up here';
  public openAttackMatrix: string = 'Open Att&ck Matrix';

  pdr_choices = ['low', 'medium', 'significant', 'none', 'n/a'];
  default_choice = 'none';
  displayedColumns = ['capability', 'protect', 'detect', 'respond'];


  incomingListOfAttackPatterns: string[] = [
    'Determine strategy and goals',
    'Analyze mission',
    'Produce operational plans',
    'Select strategic targets',
  ]

  attackPatterns: string[] = [
    'Determine strategy and goals',
    'Analyze mission',
    'Produce operational plans',
    'Select strategic targets',
    'Receive approval to execute operations',
    'Issue operational tasking',
    'Develop capabilities',
    'Obtain financing',
    'Staff and train resources',
    'Build alliances and partnerships',
    'Acquire operational infrastructure',
    'Create botnet',
    'Seed supply chain',
    'Identify intelligence gaps',
    'Identify capability gaps',
    'Gather intelligence',
  ]

  selectedRow: any;
  rows: any;
  dataSource: any;
  selected_row_index: number;

  selectedAttackPatterns = new FormControl();

  @Output()
  public onToggleHeatMap = new EventEmitter<boolean>();
  public currentCapability: Capability;
  public currentCapabilityName: string;
  public currentCapabilityDescription: string;
  public objectAssessments: ObjectAssessment[];

  constructor(private wizardStore: Store<assessReducers.BaselineState>) { 

    const sub1$ = this.wizardStore
      .select('baseline')
      .pluck('currentCapability')
      .distinctUntilChanged()
      .subscribe(
        (currentCapability: Capability) => {
          this.currentCapability = currentCapability
          this.currentCapabilityName = (this.currentCapability === undefined) ? '' : this.currentCapability.name;
          this.currentCapabilityDescription = (this.currentCapability === undefined) ? '' : this.currentCapability.description;
        }, (err) => console.log(err));


    this.dataSource =  new MatTableDataSource<TableEntry>(
      this.incomingListOfAttackPatterns.map(x => ({
        id: 1,  // TODO: get id
        capability: x,
        protect: this.default_choice,
        detect: this.default_choice,
        respond: this.default_choice,
        definition: 'need to get this!'  // TODO: get definition
      }))
    );
  }

  ngOnInit() {
  }

  public onAttackPatternChange(event): void {
    // Updates the datasource when an AP is added or removed. This also dynamically updates the table.
    const selectedValues = this.selectedAttackPatterns.value;
    const prevValues = this.dataSource.data || [];

    let new_data = [];
    // removing anything not selected (save values of those that was selected)
    for (let selectedValue of selectedValues) {
      let x = prevValues.find(z => z.capability === selectedValue)
      if (x === undefined) {
        // Add new ap with default values
        new_data.push({id: 1, capability: selectedValue})   // TODO: get id 
      } else {
        // Keep original stuff
        new_data.push(prevValues.find(z => z.capability === selectedValue));
      }
    }
    this.dataSource.data = new_data;
  }

  updatePDRScore (index: number, pdr: string, value: string) {
    // Updates the datasource when a PDR score is entered.
    this.dataSource.data[index][pdr] = value; 
  }

  logDataSource() {
    // Debug code to get the contents of the datasource.
    console.log(this.dataSource.data);
    // console.log(this.selectedAttackPatterns.value)
  }

  applyFilter(filterValue: string) {
    // Code to filter the data table
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export interface TableEntry {
  id: number;
  capability: string;
  protect: string;
  detect: string;
  respond: string;
  definition: string;
}
