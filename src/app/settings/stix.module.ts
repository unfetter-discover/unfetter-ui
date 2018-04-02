import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatExpansionModule, 
  MatInputModule, MatListModule, MatNativeDateModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule } from '@angular/material';
import { AccordionModule, CalendarModule, DataListModule } from 'primeng/primeng';
import { ComponentModule } from '../components/component.module';
import { GlobalModule } from '../global/global.module';
import { IdentifierSummarizedPipe, IdentifierTypePipe } from '../pipes';
import { LinkExplorerComponent } from './link-explorer';
import { StixHomeComponent } from './stix-home.component';
import { AttackPatternComponent, AttackPatternEditComponent, AttackPatternListComponent, AttackPatternNewComponent, AttackPatternsHomeComponent } from './stix-objects/attack-patterns';
import { CampaignComponent, CampaignsEditComponent, CampaignsHomeComponent, CampaignsListComponent, CampaignsNewComponent } from './stix-objects/campaigns';
import { CourseOfActionComponent, CourseOfActionEditComponent, CourseOfActionHomeComponent, CourseOfActionListComponent, CourseOfActionNewComponent } from './stix-objects/course-of-actions';
import { IdentityComponent, IdentityEditComponent, IdentityHomeComponent, IdentityListComponent, IdentityNewComponent } from './stix-objects/identities';
import { IndicatorComponent, IndicatorEditComponent, IndicatorHomeComponent, IndicatorListComponent, IndicatorNewComponent } from './stix-objects/indicators';
import { IntrusionSetComponent, IntrusionSetEditComponent, IntrusionSetHomeComponent, IntrusionSetListComponent, IntrusionSetNewComponent } from './stix-objects/intrusion-sets';
import { MalwareComponent, MalwareEditComponent, MalwareHomeComponent, MalwareListComponent, MalwareNewComponent } from './stix-objects/malwares';
import { IntrusionUsesAttackComponent, MitigateComponent, MitigateListComponent, RelationshipNewComponent, RelationshipsComponent } from './stix-objects/relationships';
import { ReportNewComponent, ReportsComponent, ReportsListComponent } from './stix-objects/reports';
import { SensorComponent, SensorEditComponent, SensorHomeComponent, SensorListComponent, SensorNewComponent } from './stix-objects/sensors';
import { SightingComponent, SightingEditComponent, SightingHomeComponent, SightingListComponent, SightingNewComponent } from './stix-objects/sightings';
import { ThreatActorEditComponent, ThreatActorHomeComponent, ThreatActorListComponent, ThreatActorNewComponent, ThreatActorsComponent } from './stix-objects/threat-actors';
import { ToolComponent, ToolEditComponent, ToolHomeComponent, ToolListComponent, ToolNewComponent } from './stix-objects/tools';
import { routing } from './stix.routing';
import { StixService } from './stix.service';

const materialModules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
];

const stixComponents = [
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
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    ComponentModule,
    CalendarModule,
    AccordionModule,
    DataListModule,
    GlobalModule,
    routing,
  ],
  declarations: [
    ...stixComponents,
  ],

  providers: [StixService],
})
export class StixModule { }
