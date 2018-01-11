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
<<<<<<< HEAD
import { MatToolbarModule } from '@angular/material';
=======
import { MatSidenavModule } from '@angular/material/sidenav';
>>>>>>> interim

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ~~~ Local ~~~

// Pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SophisticationPipe } from './pipes/sophistication.pipe';
import { FieldSortPipe } from './pipes/field-sort.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

// Components
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
<<<<<<< HEAD
    MatToolbarModule
=======
    MatSidenavModule,
>>>>>>> interim
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
    SidepanelComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ...matModules
    ],
    exports: [
        ...unfetterComponents,
        ...matModules,
    ],
    declarations: [
        ...unfetterComponents
    ],
    providers: []
})

export class GlobalModule { }
