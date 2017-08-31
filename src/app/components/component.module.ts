import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule,  ApplicationRef } from '@angular/core';
import { RouterModule,  PreloadAllModules } from '@angular/router';
import { CalendarModule, AccordionModule, DataListModule, CheckboxModule } from 'primeng/primeng';
import { MaterialModule, MdButtonModule, MdListModule, MdCardModule,
  MdDialogModule, MdChipsModule, MdInputModule, MdSelectModule, MdAutocompleteModule, MdCheckboxModule } from '@angular/material';
import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';
import { PageHeaderComponent } from './page/page-header.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation/confirmation-dialog.component';
import { IndicatorPatternFieldComponent } from './indicator-pattern-field/indicator-pattern-field.component';
import { SelectSearchFieldComponent } from './select-search-field/select-search-field.component';
import { ExternalReferenceComponent } from './external-reference/external-reference.component';
import { KillChainPhasesComponent } from './kill-chain-phases/kill-chain-phases.compoenet';
import { ListStixObjectComponent } from './list-stix-objects/list-stix-objects.component';
import { ReadonlyContentComponent } from './readonly-content/readonly-content.component';
import { AliasesComponent } from './aliases/aliases.component';
import { FilterSearchBoxComponent } from './filter-search-box/filter-search-box.component';
import { RelationshipListComponent } from './relationship-list/relationship-list.component';
import { MitigateListComponent } from './mitigate-list/mitigate-list.component';
import { BaseComponentService } from './base-service.component';
import { ButtonsFilterComponent } from './buttons-filter/buttons-filter.component';
import { LinkNodeGraphComponent } from './link-node-graph/link-node-graph.component';
import { LabelComponent } from './labels/label.component';
@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    PageHeaderComponent,
    HeaderNavigationComponent,
    ConfirmationDialogComponent,
    IndicatorPatternFieldComponent,
    SelectSearchFieldComponent,
    ExternalReferenceComponent,
    KillChainPhasesComponent,
    ListStixObjectComponent,
    ReadonlyContentComponent,
    AliasesComponent,
    FilterSearchBoxComponent,
    RelationshipListComponent,
    MitigateListComponent,
    ButtonsFilterComponent,
    LinkNodeGraphComponent,
    LabelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    MaterialModule,
    MdSelectModule,
    MdInputModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdCardModule,
    MdChipsModule,
    DataListModule,
    CheckboxModule,
    MdCheckboxModule
  ],
  exports: [
    PageHeaderComponent,
    ConfirmationDialogComponent,
    HeaderNavigationComponent,
    IndicatorPatternFieldComponent,
    SelectSearchFieldComponent,
    ExternalReferenceComponent,
    KillChainPhasesComponent,
    ListStixObjectComponent,
    ReadonlyContentComponent,
    AliasesComponent,
    RelationshipListComponent,
    MitigateListComponent,
    FilterSearchBoxComponent,
    ButtonsFilterComponent,
    LinkNodeGraphComponent,
    LabelComponent
  ],
  providers: [BaseComponentService],
  entryComponents: [ConfirmationDialogComponent]
})
export class ComponentModule {}
