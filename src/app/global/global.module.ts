// ~~~ Vendor ~~~
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule, MatTableModule, MatChipsModule, MatPaginatorModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ~~~ Local ~~~

// Components
import { RiskIconComponent } from './components/risk-icon/risk-icon.component';
import { StixTableComponent } from './components/stix-table/stix-table.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { KillChainPhasesReactiveComponent } from './components/kill-chain-phases/kill-chain-phases.component';
import { ExternalReferencesReactiveComponent } from './components/external-references/external-references.component';

// Services
import { GenericApi } from './services/genericapi.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

// Pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SophisticationPipe } from './pipes/sophistication.pipe';
import { FieldSortPipe } from './pipes/field-sort.pipe';

@NgModule({
    imports: [
        CommonModule, 
        MatTooltipModule, 
        MatTableModule, 
        MatChipsModule, 
        MatPaginatorModule, 
        MatButtonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CapitalizePipe, 
        SophisticationPipe, 
        RiskIconComponent, 
        StixTableComponent, 
        FieldSortPipe, 
        LoadingSpinnerComponent,
        KillChainPhasesReactiveComponent,
        ExternalReferencesReactiveComponent
    ],
    declarations: [
        CapitalizePipe, 
        SophisticationPipe, 
        RiskIconComponent, 
        StixTableComponent, 
        FieldSortPipe, 
        LoadingSpinnerComponent,
        KillChainPhasesReactiveComponent,
        ExternalReferencesReactiveComponent
    ],
    providers: [
        GenericApi,
        AuthService,
        AuthGuard
    ]
})

export class GlobalModule {}
