// ~~~ Vendor ~~~
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule, MatTableModule, MatChipsModule, MatPaginatorModule, MatButtonModule, MatInputModule, MatProgressSpinnerModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ~~~ Local ~~~

// Components
import { RiskIconComponent } from './components/risk-icon/risk-icon.component';
import { StixTableComponent } from './components/stix-table/stix-table.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { KillChainPhasesReactiveComponent } from './components/kill-chain-phases/kill-chain-phases.component';
import { ExternalReferencesReactiveComponent } from './components/external-references/external-references.component';
import { AddLabelReactiveComponent } from './components/add-label/add-label.component';

// Pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SophisticationPipe } from './pipes/sophistication.pipe';
import { FieldSortPipe } from './pipes/field-sort.pipe';

const matModules = [
    MatTooltipModule, MatTableModule, MatChipsModule, MatPaginatorModule, MatButtonModule, MatInputModule, MatProgressSpinnerModule, MatAutocompleteModule
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
        RiskIconComponent, 
        StixTableComponent, 
        FieldSortPipe, 
        LoadingSpinnerComponent,
        KillChainPhasesReactiveComponent,
        ExternalReferencesReactiveComponent,
        AddLabelReactiveComponent
    ],
    declarations: [
        CapitalizePipe, 
        SophisticationPipe, 
        RiskIconComponent, 
        StixTableComponent, 
        FieldSortPipe, 
        LoadingSpinnerComponent,
        KillChainPhasesReactiveComponent,
        ExternalReferencesReactiveComponent,
        AddLabelReactiveComponent
    ],
    providers: []
})

export class GlobalModule {}
