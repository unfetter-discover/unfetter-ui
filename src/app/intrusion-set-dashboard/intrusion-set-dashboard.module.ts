import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule, 
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
} from '@angular/material';

import { IntrusionSetDashboardComponent } from './intrusion-set-dashboard.component';
import { IntrusionSetHighlighterService } from './intrusion-set-highlighter.service';
import { routing } from './intrusion-set-dashboard.routing';
import { AttackPatternsLegendComponent } from './attack-patterns-legend/attack-patterns-legend.component';
import { CriticalSecurityControlsComponent } from './critical-security-controls/critical-security-controls.component';
import { IntrusionSetsPanelComponent } from './intrusion-sets-panel/intrusion-sets-panel.component';
import { IntrusionSetsTacticsComponent } from './intrusion-sets-tactics/intrusion-sets-tactics.component';
import { CollapsibleTreeComponent } from './intrusion-sets-tree/collapsible-tree.component';
import { IntrusionSetsTreeComponent } from './intrusion-sets-tree/intrusion-sets-tree.component';
import { ComponentModule } from '../components';
import { GlobalModule } from '../global/global.module';

const unfetterComponents = [
    AttackPatternsLegendComponent,
    CollapsibleTreeComponent,
    CriticalSecurityControlsComponent,
    IntrusionSetDashboardComponent,
    IntrusionSetsPanelComponent,
    IntrusionSetsTacticsComponent,
    IntrusionSetsTreeComponent,
];

const materialModules = [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
];

@NgModule({
    declarations: [
        ...unfetterComponents,
    ],
    imports: [
        ComponentModule,
        GlobalModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ...materialModules,
        routing,
    ],
    providers: [
        IntrusionSetHighlighterService,
    ]
})
export class IntrusionSetDashboardModule { }
