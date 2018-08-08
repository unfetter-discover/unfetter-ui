import { RouterModule, Routes } from '@angular/router';
import { LinkExplorerComponent } from './link-explorer';
import { StixHomeComponent } from './stix-home.component';
import { AttackPatternComponent, AttackPatternEditComponent, AttackPatternListComponent, AttackPatternNewComponent, AttackPatternsHomeComponent } from './stix-objects/attack-patterns';
import { CampaignComponent, CampaignsEditComponent, CampaignsHomeComponent, CampaignsListComponent, CampaignsNewComponent } from './stix-objects/campaigns';
import { CategoriesEditComponent } from './stix-objects/categories/categories-edit/categories-edit.component';
import { CategoriesHomeComponent } from './stix-objects/categories/categories-home.component';
import { CategoriesListComponent } from './stix-objects/categories/categories-list/categories-list.component';
import { CategoriesNewComponent } from './stix-objects/categories/categories-new/categories-new.component';
import { CategoriesComponent } from './stix-objects/categories/categories/categories.component';
import { CourseOfActionComponent, CourseOfActionEditComponent, CourseOfActionHomeComponent, CourseOfActionListComponent, CourseOfActionNewComponent } from './stix-objects/course-of-actions';
import { IdentityComponent, IdentityEditComponent, IdentityHomeComponent, IdentityListComponent, IdentityNewComponent } from './stix-objects/identities';
import { IndicatorComponent, IndicatorEditComponent, IndicatorHomeComponent, IndicatorListComponent, IndicatorNewComponent } from './stix-objects/indicators';
import { IntrusionSetComponent, IntrusionSetEditComponent, IntrusionSetHomeComponent, IntrusionSetListComponent, IntrusionSetNewComponent } from './stix-objects/intrusion-sets';
import { MalwareComponent, MalwareEditComponent, MalwareHomeComponent, MalwareListComponent, MalwareNewComponent } from './stix-objects/malwares';
import { IntrusionUsesAttackComponent, MitigateComponent, MitigateListComponent } from './stix-objects/relationships';
import { ReportNewComponent, ReportsComponent, ReportsListComponent } from './stix-objects/reports';
import { SensorComponent, SensorEditComponent, SensorHomeComponent, SensorListComponent, SensorNewComponent } from './stix-objects/sensors';
import { SightingComponent, SightingEditComponent, SightingHomeComponent, SightingListComponent, SightingNewComponent } from './stix-objects/sightings';
import { ThreatActorEditComponent, ThreatActorHomeComponent, ThreatActorListComponent, ThreatActorNewComponent, ThreatActorsComponent } from './stix-objects/threat-actors';
import { ToolComponent, ToolEditComponent, ToolHomeComponent, ToolListComponent, ToolNewComponent } from './stix-objects/tools';
import { MarkingsHomeComponent, MarkingsListComponent, MarkingsNewComponent } from './stix-objects/markings';

const stixRoutes: Routes = [
  {
    path: '',
    component: StixHomeComponent,
    children: [
      {
        path: '',
        redirectTo: '/stix/attack-patterns',
        pathMatch: 'full',
      },
      {
        path: 'attack-patterns',
        component: AttackPatternsHomeComponent,
        children: [{
          path: '',
          component: AttackPatternListComponent
        },
        {
          path: 'new',
          component: AttackPatternNewComponent
        },
        {
          path: ':id',
          component: AttackPatternComponent
        },
        {
          path: 'edit/:id',
          component: AttackPatternEditComponent
        }
        ]
      },
      {
        path: 'campaigns',
        component: CampaignsHomeComponent,
        children: [{
          path: '',
          component: CampaignsListComponent
        },
        {
          path: 'new',
          component: CampaignsNewComponent
        },
        {
          path: ':id',
          component: CampaignComponent
        },
        {
          path: 'edit/:id',
          component: CampaignsEditComponent
        }
        ]
      },
      {
        path: 'categories',
        component: CategoriesHomeComponent,
        children: [{
          path: '',
          component: CategoriesListComponent
        },
        {
          path: 'new',
          component: CategoriesEditComponent
        },
        {
          path: ':id',
          component: CategoriesComponent
        },
        {
          path: 'edit/:id',
          component: CategoriesEditComponent
        }
        ]
      },
      {
        path: 'course-of-actions',
        component: CourseOfActionHomeComponent,
        children: [{
          path: '',
          component: CourseOfActionListComponent
        },
        {
          path: 'new',
          component: CourseOfActionNewComponent
        },
        {
          path: ':id',
          component: CourseOfActionComponent
        },
        {
          path: 'edit/:id',
          component: CourseOfActionEditComponent
        }
        ]
      },
      {
        path: 'sightings',
        component: SightingHomeComponent,
        children: [{
          path: '',
          component: SightingListComponent
        },
        {
          path: 'new',
          component: SightingNewComponent
        },
        {
          path: ':id',
          component: SightingComponent
        },
        {
          path: 'edit/:id',
          component: SightingEditComponent
        }
        ]
      },
      {
        path: 'reports',
        component: ReportsComponent,
        children: [{
          path: '',
          component: ReportsListComponent
        },
        {
          path: 'new',
          component: ReportNewComponent
        },

        ]
      },
      {
        path: 'threat-actors',
        component: ThreatActorHomeComponent,
        children: [{
          path: '',
          component: ThreatActorListComponent
        },
        {
          path: 'new',
          component: ThreatActorNewComponent
        },
        {
          path: ':id',
          component: ThreatActorsComponent
        },
        {
          path: 'edit/:id',
          component: ThreatActorEditComponent
        }
        ]
      },
      {
        path: 'intrusion-sets',
        component: IntrusionSetHomeComponent,
        children: [{
          path: '',
          component: IntrusionSetListComponent
        },
        {
          path: 'new',
          component: IntrusionSetNewComponent
        },
        {
          path: ':id',
          component: IntrusionSetComponent
        },
        {
          path: 'edit/:id',
          component: IntrusionSetEditComponent
        }
        ]
      },
      {
        path: 'relationships',
        children: [{
          path: 'mitigates/:type/:action',
          component: MitigateListComponent
        },
        {
          path: 'mitigates/:id',
          component: MitigateComponent
        },
        {
          path: 'intrusion-uses-attack/:id',
          component: IntrusionUsesAttackComponent
        },
        ]
      },
      {
        path: 'indicators',
        component: IndicatorHomeComponent,
        children: [{
          path: '',
          component: IndicatorListComponent
        },
        {
          path: 'new',
          component: IndicatorNewComponent
        },
        {
          path: ':id',
          component: IndicatorComponent
        },
        {
          path: 'edit/:id',
          component: IndicatorEditComponent
        }
        ]
      },
      {
        path: 'identities',
        component: IdentityHomeComponent,
        children: [{
          path: '',
          component: IdentityListComponent
        },
        {
          path: 'new',
          component: IdentityNewComponent
        },
        {
          path: ':id',
          component: IdentityComponent
        },
        {
          path: 'edit/:id',
          component: IdentityEditComponent
        }
        ]
      },
      {
        path: 'malwares',
        component: MalwareHomeComponent,
        children: [{
          path: '',
          component: MalwareListComponent
        },
        {
          path: 'new',
          component: MalwareNewComponent
        },
        {
          path: ':id',
          component: MalwareComponent
        },
        {
          path: 'edit/:id',
          component: MalwareEditComponent
        }
        ]
      },
      {
        path: 'markings',
        component: MarkingsHomeComponent,
        children: [
          {
            path: '',
            component: MarkingsListComponent
          },
          {
            path: 'new',
            component: MarkingsNewComponent
          },
        ]
      },
      {
        path: 'tools',
        component: ToolHomeComponent,
        children: [{
          path: '',
          component: ToolListComponent
        },
        {
          path: 'new',
          component: ToolNewComponent
        },
        {
          path: ':id',
          component: ToolComponent
        },
        {
          path: 'edit/:id',
          component: ToolEditComponent
        }
        ]
      },
      // { path: 'tool', component: ToolHomeComponent,
      //   children: [
      //       { path: 'new', component: ToolNewComponent },
      //       { path: ':id', component: ToolComponent },
      //       { path: 'edit/:id', component: ToolEditComponent }
      //   ]
      // },
      {
        path: 'link-explorer',
        component: LinkExplorerComponent
      },
      {
        path: 'x-unfetter-sensors',
        component: SensorHomeComponent,
        children: [{
          path: '',
          component: SensorListComponent
        },
        {
          path: 'new',
          component: SensorNewComponent
        },
        {
          path: ':id',
          component: SensorComponent
        },
        {
          path: 'edit/:id',
          component: SensorEditComponent
        }
        ]
      },
    ],
  },
];

export const routing = RouterModule.forChild(stixRoutes);
