import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AttackPatternListComponent,
  AttackPatternsHomeComponent,
  AttackPatternComponent,
  AttackPatternNewComponent,
  AttackPatternEditComponent } from './stix-objects/attack-patterns';

import {
  CampaignsHomeComponent,
  CampaignsListComponent,
  CampaignsNewComponent,
  CampaignsEditComponent,
  CampaignComponent } from './stix-objects/campaigns';

import {
  CourseOfActionHomeComponent,
  CourseOfActionListComponent,
  CourseOfActionEditComponent,
  CourseOfActionComponent,
  CourseOfActionNewComponent } from './stix-objects/course-of-actions';

  import {
    SightingHomeComponent,
    SightingListComponent,
    SightingNewComponent,
    SightingEditComponent,
    SightingComponent } from './stix-objects/sightings';

import { ThreatActorHomeComponent, ThreatActorListComponent , TheatActorComponent, ThreatActorNewComponent, ThreatActorEditComponent } from './stix-objects/threat-actors';
import { IntrusionSetHomeComponent, IntrusionSetListComponent, IntrusionSetComponent, IntrusionSetEditComponent, IntrusionSetNewComponent } from './stix-objects/intrusion-sets';
import { IndicatorHomeComponent , IndicatorListComponent, IndicatorEditComponent, IndicatorNewComponent, IndicatorComponent } from './stix-objects/indicators';
import { IdentityHomeComponent , IdentityListComponent, IdentityEditComponent, IdentityNewComponent, IdentityComponent } from './stix-objects/identities';

import { MitigateListComponent, MitigateComponent, IntrusionUsesAttackComponent } from './stix-objects/relationships';
import { ReportsComponent, ReportsListComponent, ReportNewComponent, } from './stix-objects/reports';
import { MalwareHomeComponent, MalwareListComponent, MalwareComponent, MalwareEditComponent, MalwareNewComponent } from './stix-objects/malwares';
import { ToolHomeComponent, ToolListComponent, ToolComponent, ToolEditComponent, ToolNewComponent } from './stix-objects/tools';
import { LinkExplorerComponent } from './link-explorer';

const stixRoutes: Routes = [
    { path: 'attack-patterns', component: AttackPatternsHomeComponent,
        children: [
        { path: '', component: AttackPatternListComponent },
        { path: 'new', component: AttackPatternNewComponent },
        { path: ':id', component: AttackPatternComponent },
        { path: 'edit/:id', component: AttackPatternEditComponent }
        ]
    },
    { path: 'campaigns', component: CampaignsHomeComponent,
      children: [
        { path: '', component: CampaignsListComponent },
         { path: 'new', component: CampaignsNewComponent },
         { path: ':id', component: CampaignComponent },
         { path: 'edit/:id', component: CampaignsEditComponent }
      ]
    },
    { path: 'course-of-actions', component: CourseOfActionHomeComponent,
      children: [
            { path: '', component: CourseOfActionListComponent },
            { path: 'new', component: CourseOfActionNewComponent },
            { path: ':id', component: CourseOfActionComponent },
           { path: 'edit/:id', component: CourseOfActionEditComponent }
      ]
    },
    { path: 'sightings', component: SightingHomeComponent,
      children: [
            { path: '', component: SightingListComponent },
            { path: 'new', component: SightingNewComponent },
            { path: ':id', component: SightingComponent },
            { path: 'edit/:id', component: SightingEditComponent }
      ]
    },
     { path: 'reports', component: ReportsComponent,
      children: [
            { path: '', component: ReportsListComponent },
            { path: 'new', component: ReportNewComponent },

      ]
    },
    { path: 'threat-actors', component: ThreatActorHomeComponent,
      children: [
           { path: '', component: ThreatActorListComponent },
            { path: 'new', component: ThreatActorNewComponent },
            { path: ':id', component: TheatActorComponent },
            { path: 'edit/:id', component: ThreatActorEditComponent }
      ]
    },
    { path: 'intrusion-sets', component: IntrusionSetHomeComponent,
      children: [
          { path: '', component: IntrusionSetListComponent },
          { path: 'new', component: IntrusionSetNewComponent },
          { path: ':id', component: IntrusionSetComponent },
          { path: 'edit/:id', component: IntrusionSetEditComponent }
      ]
    },
    { path: 'relationships',
      children: [
           { path: 'mitigates/:type/:action', component: MitigateListComponent},
           { path: 'mitigates/:id', component: MitigateComponent},
           { path: 'intrusion-uses-attack/:id', component: IntrusionUsesAttackComponent},
      ]
    },
    { path: 'indicators', component: IndicatorHomeComponent,
      children: [
          { path: '', component: IndicatorListComponent},
          { path: 'new', component: IndicatorNewComponent },
          { path: ':id', component: IndicatorComponent },
          { path: 'edit/:id', component: IndicatorEditComponent }
      ]
    },
    { path: 'identities', component: IdentityHomeComponent,
      children: [
          { path: '', component: IdentityListComponent},
          { path: 'new', component: IdentityNewComponent },
          { path: ':id', component: IdentityComponent },
          { path: 'edit/:id', component: IdentityEditComponent }
      ]
    },
    { path: 'malwares', component: MalwareHomeComponent,
      children: [
          { path: '', component: MalwareListComponent},
          { path: 'new', component: MalwareNewComponent },
          { path: ':id', component: MalwareComponent },
          { path: 'edit/:id', component: MalwareEditComponent }
      ]
    },
    { path: 'tools', component: ToolHomeComponent,
      children: [
          { path: '', component: ToolListComponent},
          { path: 'new', component: ToolNewComponent },
          { path: ':id', component: ToolComponent },
          { path: 'edit/:id', component: ToolEditComponent }
      ]
    },
    // { path: 'tool', component: ToolHomeComponent,
    //   children: [
    //       { path: 'new', component: ToolNewComponent },
    //       { path: ':id', component: ToolComponent },
    //       { path: 'edit/:id', component: ToolEditComponent }
    //   ]
    // },
    { path: 'link-explorer', component: LinkExplorerComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(stixRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [ ],
})
export class StixRoutingModule { }
