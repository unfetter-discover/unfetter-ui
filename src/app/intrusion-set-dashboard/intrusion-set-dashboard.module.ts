import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../components';
import { GlobalModule } from '../global/global.module';
import { routing } from './intrusion-set-dashboard.routing';
import { FormsModule } from '@angular/forms';

import { AutoCompleteModule, CarouselModule, ProgressBarModule, AccordionModule } from 'primeng/primeng';

import { MatButtonModule, MatChipsModule, MatInputModule, MatIconModule, MatTooltipModule, MatCardModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';

import { IntrusionSetDashboardComponent } from './intrusion-set-dashboard.component';
import { CollapsibleTreeComponent } from './collapsible-tree.component';
import { ConceptMapComponent } from './concept-map.component';

const unfetterComponents = [
  IntrusionSetDashboardComponent,
  CollapsibleTreeComponent,
  ConceptMapComponent,  
];

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatTooltipModule,
  MatTabsModule,
  MatProgressBarModule,
  MatProgressSpinnerModule
];

const primengModules = [
  AccordionModule,
  AutoCompleteModule,
  CarouselModule,
];

@NgModule({
  declarations: [
    ...unfetterComponents
  ],
  imports: [
    ComponentModule,
    GlobalModule,
    CommonModule,
    FormsModule,
    ...materialModules,
    ...primengModules,
    routing,
  ],
  providers: [
  ]
})
export class IntrusionSetDashboardModule { }
