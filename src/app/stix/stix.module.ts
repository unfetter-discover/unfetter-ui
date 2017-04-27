import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdListModule, MdCardModule,
  MdDialogModule, MdChipsModule, MdInputModule, MdSelectModule, MdAutocompleteModule , MdCheckboxModule } from '@angular/material';
import { DatePickerModule } from 'angular-material-datepicker';
import { ComponentModule } from '../components/component.module';
import { StixService } from './stix.service';

import {
  AttackPatternListComponent, AttackPatternsHomeComponent,
  AttackPatternComponent, AttackPatternNewComponent,
  AttackPatternEditComponent } from './attack-patterns';
import {
  CampaignsHomeComponent,
  CampaignsListComponent,
  CampaignsNewComponent,
  CampaignsEditComponent, CampaignComponent } from './campaigns';
import {
    CourseOfActionHomeComponent,
    CourseOfActionListComponent,
    CourseOfActionEditComponent,
    CourseOfActionNewComponent,
    CourseOfActionComponent } from './course-of-actions';

import {
    SightingHomeComponent,
    SightingListComponent,
    SightingNewComponent,
    SightingEditComponent,
    SightingComponent } from './sightings';

    import { ReportsComponent, ReportsListComponent, ReportNewComponent } from './reports';
    import { ThreatActorHomeComponent, ThreatActorListComponent, TheatActorComponent, ThreatActorNewComponent, ThreatActorEditComponent } from './threat-actors';
    import { IntrusionSetHomeComponent, IntrusionSetListComponent, IntrusionSetComponent, IntrusionSetEditComponent, IntrusionSetNewComponent } from './intrusion-sets';
    import { RelationshipsComponent, RelationshipNewComponent, RelationshipListComponent } from './relationships';

import { StixRoutingModule } from './stix-routing.module';

import { IdentifierTypePipe, IdentifierSummarizedPipe } from '../pipes';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      MdButtonModule,
      MdListModule,
      MdCardModule,
      MdChipsModule,
      MdInputModule,
      MdSelectModule,
      MdAutocompleteModule,
      MdCheckboxModule,
      ComponentModule,
      DatePickerModule,
      StixRoutingModule
  ],
  declarations: [
    // Components / Directives/ Pipes
    AttackPatternsHomeComponent,
    AttackPatternListComponent,
    AttackPatternComponent,
    AttackPatternNewComponent,
    AttackPatternEditComponent,

    CampaignsHomeComponent,
    CampaignsListComponent,
    CampaignsNewComponent,
    CampaignsEditComponent,
    CampaignComponent,

    CourseOfActionHomeComponent,
    CourseOfActionListComponent,
    CourseOfActionEditComponent,
    CourseOfActionNewComponent,
    CourseOfActionComponent,

    SightingHomeComponent,
    SightingListComponent,
    SightingNewComponent,
    SightingEditComponent,
    SightingComponent,

    ReportsComponent,
    ReportsListComponent,
    ReportNewComponent,

    ThreatActorHomeComponent,
    ThreatActorListComponent,
    TheatActorComponent,
    ThreatActorNewComponent,
    ThreatActorEditComponent,
    
    IntrusionSetHomeComponent,
    IntrusionSetListComponent,
    IntrusionSetComponent,
    IntrusionSetEditComponent,
    IntrusionSetNewComponent,

    RelationshipsComponent,
    RelationshipNewComponent,
    RelationshipListComponent,

    IdentifierTypePipe,
    IdentifierSummarizedPipe
    


  ],
  
  providers: [ StixService ],
})
export class StixModule {}
