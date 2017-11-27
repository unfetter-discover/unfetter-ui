// ~~~ Vendor ~~~
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule, MatTableModule, MatChipsModule, MatPaginatorModule, MatButtonModule, MatInputModule, MatProgressSpinnerModule, MatAutocompleteModule, MatCheckboxModule } from '@angular/material';
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

const matModules = [
    MatTooltipModule, MatTableModule, MatChipsModule, MatPaginatorModule, MatButtonModule, MatInputModule, MatProgressSpinnerModule, MatAutocompleteModule, MatCheckboxModule
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
        ChipLinksComponent
    ],
    declarations: [
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
        ChipLinksComponent
    ],
    providers: []
})

export class GlobalModule {}
