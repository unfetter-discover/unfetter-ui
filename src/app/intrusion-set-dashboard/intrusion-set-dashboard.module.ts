import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatProgressBarModule, MatProgressSpinnerModule, 
    MatSelectModule, MatSnackBarModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { CarouselModule } from 'primeng/components/carousel/carousel';
import { ComponentModule } from '../components';
import { GlobalModule } from '../global/global.module';
import { AttackPatternsCarouselComponent } from './attack-patterns-carousel/attack-patterns-carousel.component';
import { AttackPatternsLegendComponent } from './attack-patterns-legend/attack-patterns-legend.component';
import { CriticalSecurityControlsComponent } from './critical-security-controls/critical-security-controls.component';
import { IntrusionSetDashboardComponent } from './intrusion-set-dashboard.component';
import { routing } from './intrusion-set-dashboard.routing';
import { IntrusionSetHighlighterService } from './intrusion-set-highlighter.service';
import { IntrusionSetsPanelComponent } from './intrusion-sets-panel/intrusion-sets-panel.component';
import { CollapsibleTreeComponent } from './intrusion-sets-tree/collapsible-tree.component';
import { IntrusionSetsTreeComponent } from './intrusion-sets-tree/intrusion-sets-tree.component';

const unfetterComponents = [
    AttackPatternsCarouselComponent,
    AttackPatternsLegendComponent,
    CollapsibleTreeComponent,
    CriticalSecurityControlsComponent,
    IntrusionSetDashboardComponent,
    IntrusionSetsPanelComponent,
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
        IntrusionSetHighlighterService,
    ]
})
export class IntrusionSetDashboardModule { }
