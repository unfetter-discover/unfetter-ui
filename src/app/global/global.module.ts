import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatExpansionModule, MatListModule, MatSelectModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AddLabelReactiveComponent } from './components/add-label/add-label.component';
import { AdditionalQueriesComponent } from './components/additional-queries/additional-queries.component';
import { ChipLinksComponent } from './components/chip-links/chip-links.component';
import { CreatedByRefComponent } from './components/created-by-ref/created-by-ref.component';
import { ErrorCardComponent } from './components/error-card/error-card.component';
import { ExternalReferencesReactiveComponent } from './components/external-references/external-references.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { HeaderNavigationComponent } from './components/header-navigation/header-navigation.component';
import { AttackPatternsHeatmapComponent } from './components/heatmap/attack-patterns-heatmap.component';
import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { HelpWindowComponent } from './components/help-window/help-window.component';
import { InfoBarComponent } from './components/info-bar/info-bar.component';
import { KillChainPhasesReactiveComponent } from './components/kill-chain-phases/kill-chain-phases.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MasterListDialogComponent, MasterListDialogTriggerComponent } from './components/master-list-dialog/master-list-dialog.component';
import { NotificationWindowComponent } from './components/notification-window/notification-window.component';
import { ObservableDataSummaryComponent } from './components/observable-data-summary/observable-data-summary.component';
import { ObservableDataTreeComponent } from './components/observable-data-tree/observable-data-tree.component';
import { PiiCheckMessageComponent } from './components/pii-check-message/pii-check-message.component';
import { PublishedCheckboxComponent } from './components/published-checkbox/published-checkbox.component';
import { RelatationshipGeneratorComponent } from './components/relatationship-generator/relatationship-generator.component';
import { RiskBreakdownComponent } from './components/risk-breakdown/risk-breakdown.component';
import { RiskIconComponent } from './components/risk-icon/risk-icon.component';
import { SidepanelListItemComponent } from './components/sidepanel/sidepanel-list-item.component';
import { SidepanelMiniItemComponent } from './components/sidepanel/sidepanel-mini-item.component';
import { SidepanelOptionItemComponent } from './components/sidepanel/sidepanel-option-item.component';
import { SidepanelComponent } from './components/sidepanel/sidepanel.component';
import { SpeedDialComponent } from './components/speed-dial/speed-dial.component';
import { StixTableComponent } from './components/stix-table/stix-table.component';
import { TreemapComponent } from './components/treemap/treemap.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { FieldSortPipe } from './pipes/field-sort.pipe';
import { SophisticationPipe } from './pipes/sophistication.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

const matModules = [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
];

const unfetterComponents = [
    AddLabelReactiveComponent,
    AdditionalQueriesComponent,
    AttackPatternsHeatmapComponent,
    CapitalizePipe,
    ChipLinksComponent,
    CreatedByRefComponent,
    ErrorCardComponent,
    ExternalReferencesReactiveComponent,
    FieldSortPipe,
    FooterComponent,
    HeaderLogoComponent,
    HeaderNavigationComponent,
    HeatmapComponent,
    HelpWindowComponent,
    InfiniteScrollDirective,
    InfoBarComponent,
    KillChainPhasesReactiveComponent,
    LandingPageComponent,
    LoadingSpinnerComponent,
    MasterListDialogComponent,
    MasterListDialogTriggerComponent,
    NotificationWindowComponent,
    ObservableDataSummaryComponent,
    ObservableDataTreeComponent,
    PiiCheckMessageComponent,
    PublishedCheckboxComponent,
    RelatationshipGeneratorComponent,
    RiskBreakdownComponent,
    RiskIconComponent,
    SidepanelComponent,
    SidepanelListItemComponent,
    SidepanelMiniItemComponent,
    SidepanelOptionItemComponent,
    SophisticationPipe,
    SpeedDialComponent,
    StixTableComponent,
    TimeAgoPipe,
    TreemapComponent,
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
