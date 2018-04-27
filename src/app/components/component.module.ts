import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { DataListModule } from 'primeng/components/datalist/datalist';
import { GlobalModule } from '../global/global.module';
import { BaseComponentService } from './base-service.component';
import { ButtonsFilterComponent } from './buttons-filter/buttons-filter.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation/confirmation-dialog.component';
import { ExternalReferenceComponent } from './external-reference/external-reference.component';
import { FilterSearchBoxComponent } from './filter-search-box/filter-search-box.component';
import { IndicatorPatternFieldComponent } from './indicator-pattern-field/indicator-pattern-field.component';
import { KillChainPhasesComponent } from './kill-chain-phases/kill-chain-phases.component';
import { LinkNodeGraphComponent } from './link-node-graph/link-node-graph.component';
import { ListStixObjectComponent } from './list-stix-objects/list-stix-objects.component';
import { MitigateListComponent } from './mitigate-list/mitigate-list.component';
import { PageHeaderComponent } from './page/page-header.component';
import { ReadonlyContentComponent } from './readonly-content/readonly-content.component';
import { RelationshipListComponent } from './relationship-list/relationship-list.component';
import { SelectSearchFieldComponent } from './select-search-field/select-search-field.component';
import { StixTextArrayComponent } from './stix-text-array/stix-text-array.component';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';

@NgModule({
  declarations: [
    ButtonsFilterComponent,
    ConfirmationDialogComponent,
    ExternalReferenceComponent,
    FilterSearchBoxComponent,
    IndicatorPatternFieldComponent,
    KillChainPhasesComponent,
    LinkNodeGraphComponent,
    ListStixObjectComponent,
    MitigateListComponent,
    PageHeaderComponent,
    ReadonlyContentComponent,
    RelationshipListComponent,
    SelectSearchFieldComponent,
    StixTextArrayComponent,
    ValidationErrorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    DataListModule,
    CheckboxModule,
    MatCheckboxModule,
    GlobalModule
  ],
  exports: [
    ButtonsFilterComponent,
    ConfirmationDialogComponent,
    ExternalReferenceComponent,
    FilterSearchBoxComponent,
    IndicatorPatternFieldComponent,
    KillChainPhasesComponent,
    LinkNodeGraphComponent,
    ListStixObjectComponent,
    MitigateListComponent,
    PageHeaderComponent,
    ReadonlyContentComponent,
    RelationshipListComponent,
    SelectSearchFieldComponent,
    StixTextArrayComponent,
    ValidationErrorsComponent
  ],
  providers: [BaseComponentService],
  entryComponents: [ConfirmationDialogComponent]
})
export class ComponentModule { }
