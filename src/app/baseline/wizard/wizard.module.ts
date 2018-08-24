import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
// import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartsModule } from 'ng2-charts';
import { ComponentModule } from '../../components/component.module';
import { GlobalModule } from '../../global/global.module';
import { PipesModule } from '../../pipes/pipes.module';
import { AttackPatternChooserComponent } from './attack-pattern-chooser/attack-pattern-chooser.component';
import { CapabilitySelectorComponent } from './capability-selector/capability-selector.component';
import { CapabilityComponent } from './capability/capability.component';
import { CategoryComponent } from './category/category.component';
import { WizardComponent } from './wizard.component';
import { routing } from './wizard.routing';
import { ReactiveFormsModule } from '@angular/forms';


import {
  MatTableModule,
  MatOptionModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
  MatTooltipModule,
  MatInputModule,
} from '@angular/material';

const moduleComponents = [
  WizardComponent,
  CategoryComponent,
  CapabilitySelectorComponent,
  CapabilityComponent,
  AttackPatternChooserComponent,
];

const matModules = [
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatSelectModule,
  MatInputModule,
  MatProgressBarModule,

  MatTableModule,
  MatOptionModule,
  MatTooltipModule,

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    ...matModules,
    ComponentModule,
    ChartsModule,
    PipesModule,
    GlobalModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...moduleComponents,
  ],
  entryComponents: [
    AttackPatternChooserComponent,
  ]
})
export class WizardModule { }
