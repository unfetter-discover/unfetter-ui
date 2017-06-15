import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule, AccordionModule, DataListModule } from 'primeng/primeng';
import {
  MaterialModule, MdButtonModule, MdListModule, MdCardModule, MdSnackBarModule,
  MdDialogModule, MdChipsModule, MdInputModule, MdSelectModule, MdAutocompleteModule , MdCheckboxModule, MdRadioModule, MdSlideToggleModule } from '@angular/material';

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

    import { ReportsComponent, ReportsListComponent, ReportNewComponent } from './stix-objects/reports';
    import { ThreatActorHomeComponent, ThreatActorListComponent, TheatActorComponent, ThreatActorNewComponent, ThreatActorEditComponent } from './stix-objects/threat-actors';
    import { IntrusionSetHomeComponent, IntrusionSetListComponent, IntrusionSetComponent, IntrusionSetEditComponent, IntrusionSetNewComponent } from './stix-objects/intrusion-sets';
    import { MitigateListComponent, MitigateComponent, IntrusionUsesAttackComponent } from './stix-objects/relationships';
    import { IndicatorHomeComponent , IndicatorListComponent, IndicatorEditComponent, IndicatorNewComponent, IndicatorComponent } from './stix-objects/indicators';
    import { IdentityHomeComponent , IdentityListComponent, IdentityEditComponent, IdentityNewComponent, IdentityComponent } from './stix-objects/identities';

import { MalwareHomeComponent, MalwareListComponent, MalwareComponent, MalwareEditComponent, MalwareNewComponent } from './stix-objects/malwares';
import { ToolHomeComponent, ToolListComponent, ToolComponent, ToolEditComponent, ToolNewComponent } from './stix-objects/tools';
import { LinkExplorerComponent } from './link-explorer';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      MaterialModule,
      MdSnackBarModule,
      MdButtonModule,
      MdListModule,
      MdCardModule,
      MdChipsModule,
      MdInputModule,
      MdSelectModule,
      MdAutocompleteModule,
      MdCheckboxModule,
      MdRadioModule,
      MdSlideToggleModule,
      ComponentModule,
      CalendarModule,
      AccordionModule,
      DataListModule,
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
    ToolHomeComponent,
    ToolListComponent,
    ToolComponent,
    ToolEditComponent,
    ToolNewComponent,
    LinkExplorerComponent
  ],

  providers: [ StixService ],
})
export class StixModule {}
