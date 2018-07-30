import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
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
} from '@angular/material';
import { CarouselModule } from 'primeng/primeng';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { AdditionalQueriesComponent } from './components/additional-queries/additional-queries.component';
import { AddLabelReactiveComponent } from './components/add-label/add-label.component';
import { ChipLinksComponent } from './components/chip-links/chip-links.component';
import { CreatedByRefComponent } from './components/created-by-ref/created-by-ref.component';
import { DataSourcesComponent } from './components/data-sources/data-sources.component';
import { ErrorCardComponent } from './components/error-card/error-card.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ExternalReferencesReactiveComponent } from './components/external-references/external-references.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { HeaderNavigationComponent } from './components/header-navigation/header-navigation.component';
import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { HelpWindowComponent } from './components/help-window/help-window.component';
import { InfoBarComponent } from './components/info-bar/info-bar.component';
import { KillChainPhasesReactiveComponent } from './components/kill-chain-phases/kill-chain-phases.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MarkdownEditorComponent } from './components/markdown-editor/markdown-editor.component';
import { MarkingsChipsComponent } from './components/marking-references/markings-chips.component';
import {
    MasterListDialogComponent,
    MasterListDialogTriggerComponent,
} from './components/master-list-dialog/master-list-dialog.component';
import { NotificationWindowComponent } from './components/notification-window/notification-window.component';
import { ObservableDataSummaryComponent } from './components/observable-data-summary/observable-data-summary.component';
import { ObservableDataTreeComponent } from './components/observable-data-tree/observable-data-tree.component';
import { PiiCheckMessageComponent } from './components/pii-check-message/pii-check-message.component';
import { PublishedCheckboxComponent } from './components/published-checkbox/published-checkbox.component';
import { RelatationshipGeneratorComponent } from './components/relatationship-generator/relatationship-generator.component';
import { RiskBreakdownComponent } from './components/risk-breakdown/risk-breakdown.component';
import { RiskIconComponent } from './components/risk-icon/risk-icon.component';
import { SelectionListComponent } from './components/selection-list/selection-list.component';
import { SidepanelComponent } from './components/sidepanel/sidepanel.component';
import { SidepanelListItemComponent } from './components/sidepanel/sidepanel-list-item.component';
import { SidepanelMiniItemComponent } from './components/sidepanel/sidepanel-mini-item.component';
import { SidepanelOptionItemComponent } from './components/sidepanel/sidepanel-option-item.component';
import { SpeedDialComponent } from './components/speed-dial/speed-dial.component';
import { StixTableComponent } from './components/stix-table/stix-table.component';
import { TacticsCarouselComponent } from './components/tactics-pane/tactics-carousel/tactics-carousel.component';
import { TacticsCarouselControlComponent } from './components/tactics-pane/tactics-carousel/tactics-carousel-control.component';
import { TacticsControlService } from './components/tactics-pane/tactics-control.service';
import { TacticsHeatmapComponent } from './components/tactics-pane/tactics-heatmap/tactics-heatmap.component';
import { TacticsPaneComponent } from './components/tactics-pane/tactics-pane.component';
import { TacticsTooltipComponent } from './components/tactics-pane/tactics-tooltip/tactics-tooltip.component';
import { TacticsTooltipService } from './components/tactics-pane/tactics-tooltip/tactics-tooltip.service';
import { TacticsTreemapComponent } from './components/tactics-pane/tactics-treemap/tactics-treemap.component';
import { TreemapComponent } from './components/treemap/treemap.component';

import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ResizeDirective } from './directives/resize.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { FieldSortPipe } from './pipes/field-sort.pipe';
import { SophisticationPipe } from './pipes/sophistication.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { AuthService } from '../core/services/auth.service';
import { ReadableBytesPipe } from './pipes/readable-bytes.pipe';
import { FileListComponent } from './components/file-list/file-list.component';

const matModules = [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
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
    CapitalizePipe,
    ChipLinksComponent,
    CreatedByRefComponent,
    DataSourcesComponent,
    ErrorCardComponent,
    ExternalReferencesReactiveComponent,
    FieldSortPipe,
    FooterComponent,
    HeaderLogoComponent,
    HeaderNavigationComponent,
    HeatmapComponent,
    HelpWindowComponent,
    InfiniteScrollDirective,
    ResizeDirective,
    InfoBarComponent,
    KillChainPhasesReactiveComponent,
    LandingPageComponent,
    LoadingSpinnerComponent,
    MarkingsChipsComponent,
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
    TacticsCarouselComponent,
    TacticsCarouselControlComponent,
    TacticsHeatmapComponent,
    TacticsTooltipComponent,
    TacticsTreemapComponent,
    TacticsPaneComponent,
    TimeAgoPipe,
    TreemapComponent,
    MarkdownEditorComponent,
    SelectionListComponent,
    ErrorPageComponent,
    ReadableBytesPipe,
    FileListComponent,
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MarkdownModule.forRoot({
            markedOptions: {
                provide: MarkedOptions,
                useValue: {
                    gfm: true,
                    tables: true,
                    breaks: true,
                    sanitize: false,
                    pedantic: false,
                    smartLists: true,
                    smartypants: true,
                }
            }
        }),
        CarouselModule,
        ...matModules
    ],
    declarations: [
        ...unfetterComponents,
    ],
    exports: [
        ...unfetterComponents,
        ...matModules,
        CarouselModule,
    ],
    providers: [
        AuthService,
        TacticsControlService,
        TacticsTooltipService,
    ],
    entryComponents: [MasterListDialogComponent]
})

export class GlobalModule { }
