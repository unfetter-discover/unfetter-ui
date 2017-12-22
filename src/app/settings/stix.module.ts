import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule, AccordionModule, DataListModule } from 'primeng/primeng';
import {
  MatButtonModule, MatListModule, MatCardModule, MatSnackBarModule, MatNativeDateModule,
  MatDialogModule, MatChipsModule, MatInputModule, MatSelectModule, MatAutocompleteModule ,
   MatCheckboxModule, MatRadioModule, MatSlideToggleModule, MatExpansionModule, MatDatepickerModule, MatProgressSpinnerModule } from '@angular/material';

import { ComponentModule } from '../components/component.module';
import { StixService } from './stix.service';
import { StixRoutingModule } from './stix-routing.module';
import { IdentifierTypePipe, IdentifierSummarizedPipe } from '../pipes';

import {
  AttackPatternListComponent, AttackPatternsHomeComponent,
  AttackPatternComponent, AttackPatternNewComponent,
  AttackPatternEditComponent } from './stix-objects/attack-patterns';
import {
  CampaignsHomeComponent,
  CampaignsListComponent,
  CampaignsNewComponent,
  CampaignsEditComponent, CampaignComponent } from './stix-objects/campaigns';
import {
    CourseOfActionHomeComponent,
    CourseOfActionListComponent,
    CourseOfActionEditComponent,
    CourseOfActionNewComponent,
    CourseOfActionComponent } from './stix-objects/course-of-actions';

import {
    SightingHomeComponent,
    SightingListComponent,
    SightingNewComponent,
    SightingEditComponent,
    SightingComponent } from './stix-objects/sightings';

import { SensorHomeComponent, SensorListComponent, SensorNewComponent, SensorEditComponent, SensorComponent } from './stix-objects/sensors';
import { ReportsComponent, ReportsListComponent, ReportNewComponent } from './stix-objects/reports';
import { ThreatActorHomeComponent, ThreatActorListComponent, ThreatActorsComponent, ThreatActorNewComponent, ThreatActorEditComponent } from './stix-objects/threat-actors';
import { IntrusionSetHomeComponent, IntrusionSetListComponent, IntrusionSetComponent, IntrusionSetEditComponent, IntrusionSetNewComponent } from './stix-objects/intrusion-sets';
import { MitigateListComponent, MitigateComponent, IntrusionUsesAttackComponent, RelationshipsComponent, RelationshipNewComponent } from './stix-objects/relationships';
import { IndicatorHomeComponent , IndicatorListComponent, IndicatorEditComponent, IndicatorNewComponent, IndicatorComponent } from './stix-objects/indicators';
import { IdentityHomeComponent , IdentityListComponent, IdentityEditComponent, IdentityNewComponent, IdentityComponent } from './stix-objects/identities';

import { MalwareHomeComponent, MalwareListComponent, MalwareComponent, MalwareEditComponent, MalwareNewComponent } from './stix-objects/malwares';
import { ToolHomeComponent, ToolListComponent, ToolComponent, ToolEditComponent, ToolNewComponent } from './stix-objects/tools';
import { LinkExplorerComponent } from './link-explorer';
import { StixHomeComponent } from './stix-home.component';
import { GlobalModule } from '../global/global.module';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatAutocompleteModule,
      MatSnackBarModule,
      MatButtonModule,
      MatCardModule,
      MatChipsModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatExpansionModule,
      MatInputModule,
      MatListModule,
      MatNativeDateModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatSelectModule,
      MatSlideToggleModule,
      ComponentModule,
      CalendarModule,
      AccordionModule,
      DataListModule,
      StixRoutingModule,
      GlobalModule
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

    SensorHomeComponent,
    SensorListComponent,
    SensorNewComponent,
    SensorEditComponent,
    SensorComponent,

    ReportsComponent,
    ReportsListComponent,
    ReportNewComponent,

    ThreatActorHomeComponent,
    ThreatActorListComponent,
    ThreatActorsComponent,
    ThreatActorNewComponent,
    ThreatActorEditComponent,

    IntrusionSetHomeComponent,
    IntrusionSetListComponent,
    IntrusionSetComponent,
    IntrusionSetEditComponent,
    IntrusionSetNewComponent,

    MitigateListComponent,
    MitigateComponent,
    IntrusionUsesAttackComponent,
    IndicatorHomeComponent,
    IndicatorListComponent,
    IndicatorEditComponent,
    IndicatorNewComponent,
    IndicatorComponent,

    IdentityHomeComponent,
    IdentityListComponent,
    IdentityEditComponent,
    IdentityNewComponent,
    IdentityComponent,

    IdentifierTypePipe,
    IdentifierSummarizedPipe,

    MalwareHomeComponent,
    MalwareListComponent,
    MalwareEditComponent,
    MalwareComponent,
    MalwareNewComponent,
    RelationshipsComponent,
    RelationshipNewComponent,
    ToolHomeComponent,
    ToolListComponent,
    ToolComponent,
    ToolEditComponent,
    ToolNewComponent,
    LinkExplorerComponent,
    StixHomeComponent
  ],

  providers: [ StixService ],
})
export class StixModule {}
