import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, 
  MatExpansionModule, MatInputModule, MatListModule, MatNativeDateModule, MatProgressSpinnerModule, MatRadioModule, 
  MatSelectModule, MatSlideToggleModule, MatSnackBarModule } from '@angular/material';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { DataListModule } from 'primeng/components/datalist/datalist';
import { ComponentModule } from '../components/component.module';
import { GlobalModule } from '../global/global.module';
import { IdentifierSummarizedPipe, IdentifierTypePipe } from '../pipes';
import { LinkExplorerComponent } from './link-explorer';
import { StixHomeComponent } from './stix-home.component';
import { AttackPatternComponent, AttackPatternEditComponent, AttackPatternListComponent, AttackPatternNewComponent, AttackPatternsHomeComponent } from './stix-objects/attack-patterns';
import { CampaignComponent, CampaignsEditComponent, CampaignsHomeComponent, CampaignsListComponent, CampaignsNewComponent } from './stix-objects/campaigns';
import { CategoriesEditComponent } from './stix-objects/categories/categories-edit/categories-edit.component';
import { CategoriesHomeComponent } from './stix-objects/categories/categories-home.component';
import { CategoriesListComponent } from './stix-objects/categories/categories-list/categories-list.component';
import { CategoriesComponent } from './stix-objects/categories/categories/categories.component';
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
import { MarkingsHomeComponent, MarkingsListComponent, MarkingsNewComponent } from './stix-objects/markings';
import { routing } from './stix.routing';
import { StixService } from './stix.service';

const materialModules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
];

const stixComponents = [
  AttackPatternComponent,
  AttackPatternEditComponent,
  AttackPatternListComponent,
  AttackPatternNewComponent,
  AttackPatternsHomeComponent,
  CampaignComponent,
  CampaignsEditComponent,
  CampaignsHomeComponent,
  CampaignsListComponent,
  CampaignsNewComponent,
  CategoriesComponent,
  CategoriesEditComponent,
  CategoriesHomeComponent,
  CategoriesListComponent,
  CourseOfActionComponent,
  CourseOfActionEditComponent,
  CourseOfActionHomeComponent,
  CourseOfActionListComponent,
  CourseOfActionNewComponent,
  IdentifierSummarizedPipe,
  IdentifierTypePipe,
  IdentityComponent,
  IdentityEditComponent,
  IdentityHomeComponent,
  IdentityListComponent,
  IdentityNewComponent,
  IndicatorComponent,
  IndicatorEditComponent,
  IndicatorHomeComponent,
  IndicatorListComponent,
  IndicatorNewComponent,
  IntrusionSetComponent,
  IntrusionSetEditComponent,
  IntrusionSetHomeComponent,
  IntrusionSetListComponent,
  IntrusionSetNewComponent,
  IntrusionUsesAttackComponent,
  LinkExplorerComponent,
  MalwareComponent,
  MalwareEditComponent,
  MalwareHomeComponent,
  MalwareListComponent,
  MalwareNewComponent,
  MarkingsHomeComponent,
  MarkingsListComponent,
  MarkingsNewComponent,
  MitigateComponent,
  MitigateListComponent,
  RelationshipNewComponent,
  RelationshipsComponent,
  ReportNewComponent,
  ReportsComponent,
  ReportsListComponent,
  SensorComponent,
  SensorEditComponent,
  SensorHomeComponent,
  SensorListComponent,
  SensorNewComponent,
  SightingComponent,
  SightingEditComponent,
  SightingHomeComponent,
  SightingListComponent,
  SightingNewComponent,
  StixHomeComponent,
  ThreatActorEditComponent,
  ThreatActorHomeComponent,
  ThreatActorListComponent,
  ThreatActorNewComponent,
  ThreatActorsComponent,
  ToolComponent,
  ToolEditComponent,
  ToolHomeComponent,
  ToolListComponent,
  ToolNewComponent,
];

const primengModules = [
  AccordionModule,
  CalendarModule,
  DataListModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    ComponentModule,
    ...primengModules,
    GlobalModule,
    routing,
  ],
  declarations: [
    ...stixComponents,
  ],
  providers: [StixService],
})
export class StixModule { }
