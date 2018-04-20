// ~~~ Vendor ~~~
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule, MatDialog, MatCardModule, MatSelectModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ~~~ Local ~~~

// Pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SophisticationPipe } from './pipes/sophistication.pipe';
import { FieldSortPipe } from './pipes/field-sort.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

// Components and directives
import { RiskIconComponent } from './components/risk-icon/risk-icon.component';
import { StixTableComponent } from './components/stix-table/stix-table.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { KillChainPhasesReactiveComponent } from './components/kill-chain-phases/kill-chain-phases.component';
import { ExternalReferencesReactiveComponent } from './components/external-references/external-references.component';
import { AddLabelReactiveComponent } from './components/add-label/add-label.component';
import { ObservableDataTreeComponent } from './components/observable-data-tree/observable-data-tree.component';
import { ChipLinksComponent } from './components/chip-links/chip-links.component';
import { ObservableDataSummaryComponent } from './components/observable-data-summary/observable-data-summary.component';
import { HeaderNavigationComponent } from './components/header-navigation/header-navigation.component';
import { NotificationWindowComponent } from './components/notification-window/notification-window.component';
import { SpeedDialComponent } from './components/speed-dial/speed-dial.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SidepanelComponent } from './components/sidepanel/sidepanel.component';
import { SidepanelListItemComponent } from './components/sidepanel/sidepanel-list-item.component';
import { SidepanelOptionItemComponent } from './components/sidepanel/sidepanel-option-item.component';
import { SidepanelMiniItemComponent } from './components/sidepanel/sidepanel-mini-item.component';
import { HelpWindowComponent } from './components/help-window/help-window.component';
import { AdditionalQueriesComponent } from './components/additional-queries/additional-queries.component';
import { MasterListDialogComponent, MasterListDialogTriggerComponent } from './components/master-list-dialog/master-list-dialog.component';
import { ErrorCardComponent } from './components/error-card/error-card.component';
import { RiskBreakdownComponent } from './components/risk-breakdown/risk-breakdown.component';
import { TreemapComponent } from './components/treemap/treemap.component';
import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { CreatedByRefComponent } from './components/created-by-ref/created-by-ref.component';
import { RelatationshipGeneratorComponent } from './components/relatationship-generator/relatationship-generator.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { PublishedCheckboxComponent } from './components/published-checkbox/published-checkbox.component';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { AttackPatternsHeatmapComponent } from './components/heatmap/attack-patterns-heatmap.component';
import { PiiCheckMessageComponent } from './components/pii-check-message/pii-check-message.component';

const matModules = [
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule
];

const unfetterComponents = [
    CapitalizePipe,
    SophisticationPipe,
    TimeAgoPipe,
    RiskIconComponent,
    StixTableComponent,
    FieldSortPipe,
    LoadingSpinnerComponent,
    KillChainPhasesReactiveComponent,
    ExternalReferencesReactiveComponent,
    AddLabelReactiveComponent,
    ObservableDataTreeComponent,
    ChipLinksComponent,
    ObservableDataSummaryComponent,
    HeaderNavigationComponent,
    NotificationWindowComponent,
    SpeedDialComponent,
    FooterComponent,
    LandingPageComponent,
    SidepanelComponent,
    SidepanelListItemComponent,
    SidepanelOptionItemComponent,
    SidepanelMiniItemComponent,
    HelpWindowComponent,
    AdditionalQueriesComponent,
    MasterListDialogTriggerComponent,
    MasterListDialogComponent,
    ErrorCardComponent,
    RiskBreakdownComponent,
    TreemapComponent,
    HeatmapComponent,
    AttackPatternsHeatmapComponent,
    CreatedByRefComponent,
    RelatationshipGeneratorComponent,
    InfiniteScrollDirective,
    PublishedCheckboxComponent,
    HeaderLogoComponent,
    PiiCheckMessageComponent,
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ...matModules
    ],
    declarations: [
        ...unfetterComponents,        
    ],
    exports: [
        ...unfetterComponents,
        ...matModules,
    ],
    providers: [],
    entryComponents: [MasterListDialogComponent]
})

export class GlobalModule { }
