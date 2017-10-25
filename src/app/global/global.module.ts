// Vendor
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule, MatTableModule, MatChipsModule, MatPaginatorModule, MatButtonModule } from '@angular/material';

// Local
import { GenericApi } from './services/genericapi.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SophisticationPipe } from './pipes/sophistication.pipe';
import { FieldSortPipe } from './pipes/field-sort.pipe';
import { RiskIconComponent } from './components/risk-icon/risk-icon.component';
import { StixTableComponent } from './components/stix-table/stix-table.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatTableModule,
        MatTooltipModule,
        MatChipsModule,
        MatPaginatorModule,
        MatButtonModule
    ],
    exports: [
        CapitalizePipe,
        SophisticationPipe,
        RiskIconComponent,
        StixTableComponent,
        FieldSortPipe,
        LoadingSpinnerComponent
    ],
    declarations: [
        CapitalizePipe,
        SophisticationPipe,
        RiskIconComponent,
        StixTableComponent,
        FieldSortPipe,
        LoadingSpinnerComponent
    ],
    providers: [
        GenericApi,
        AuthService,
        AuthGuard
    ]
})

export class GlobalModule {}
