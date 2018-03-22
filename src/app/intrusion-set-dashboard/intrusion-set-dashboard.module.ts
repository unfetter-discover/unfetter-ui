import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
        MatButtonModule,
        MatChipsModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatCardModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatSelectModule,
    } from '@angular/material';
import { AutoCompleteModule, CarouselModule, ProgressBarModule, AccordionModule } from 'primeng/primeng';

import { ComponentModule } from '../components';
import { GlobalModule } from '../global/global.module';
import { routing } from './intrusion-set-dashboard.routing';
import { IntrusionSetDashboardComponent } from './intrusion-set-dashboard.component';
import { IntrusionSetsPanelComponent } from './intrusion-sets-panel/intrusion-sets-panel.component';
import { AttackPatternsLegendComponent } from './attack-patterns-legend/attack-patterns-legend.component';
import { AttackPatternsHeatmapComponent } from './attack-patterns-heatmap/attack-patterns-heatmap.component';
import { AttackPatternHighlighterService } from './attack-pattern-highlighter.service';
import { AttackPatternsCarouselComponent } from './attack-patterns-carousel/attack-patterns-carousel.component';
import { CriticalSecurityControlsComponent } from './critical-security-controls/critical-security-controls.component';
import { IntrusionSetsTreeComponent } from './intrusion-sets-tree/intrusion-sets-tree.component';
import { CollapsibleTreeComponent } from './intrusion-sets-tree/collapsible-tree.component';

const unfetterComponents = [
    IntrusionSetDashboardComponent,
    IntrusionSetsPanelComponent,
    CollapsibleTreeComponent,
    AttackPatternsLegendComponent,
    AttackPatternsHeatmapComponent,
    AttackPatternsCarouselComponent,
    IntrusionSetsTreeComponent,
    CriticalSecurityControlsComponent,
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
        ...unfetterComponents,
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
        AttackPatternHighlighterService,
    ]
})
export class IntrusionSetDashboardModule { }
