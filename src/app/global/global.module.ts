// Vendor
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

// Local
import { GenericApi } from './services/genericapi.service';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SophisticationPipe } from './pipes/sophistication.pipe';
import { FieldSortPipe } from './pipes/field-sort.pipe';
import { RiskIconComponent } from './components/risk-icon/risk-icon.component';

@NgModule({
    imports: [CommonModule, MaterialModule],
    exports: [CapitalizePipe, SophisticationPipe, RiskIconComponent, FieldSortPipe],
    declarations: [CapitalizePipe, SophisticationPipe, RiskIconComponent, FieldSortPipe],
    providers: [GenericApi]
})

export class GlobalModule {}
