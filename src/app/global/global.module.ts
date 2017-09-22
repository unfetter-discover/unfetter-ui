// Vendor
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

// Local
import { GenericApi } from './services/genericapi.service';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SophisticationPipe } from './pipes/sophistication.pipe';
import { FieldSortPipe } from './pipes/field-sort.pipe';
import { RiskIconComponent } from './components/risk-icon/risk-icon.component';
import { StixTableComponent } from './components/stix-table/stix-table.component';

@NgModule({
    imports: [CommonModule, MaterialModule, RouterModule],
    exports: [CapitalizePipe, SophisticationPipe, RiskIconComponent, StixTableComponent, FieldSortPipe],
    declarations: [CapitalizePipe, SophisticationPipe, RiskIconComponent, StixTableComponent, FieldSortPipe],
    providers: [GenericApi]
})

export class GlobalModule {}
