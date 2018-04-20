import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardComponent } from './wizard.component';

import { routing } from './wizard.routing';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ComponentModule } from '../../components/component.module';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../../pipes/pipes.module';
import { GlobalModule } from '../../global/global.module';
import { CategoryComponent } from './category/category.component';
import { CapabilityComponent } from './capability/capability.component';

const moduleComponents = [
  WizardComponent,
  CategoryComponent,
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
  MatProgressBarModule
];

const primengModules = [
  CalendarModule,
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    ...matModules,
    ...primengModules,
    ComponentModule,
    ChartsModule,
    PipesModule,
    GlobalModule,
  ],
  declarations: [
    ...moduleComponents,
    CapabilityComponent,
  ],
  exports: [
    ...moduleComponents,
  ],
})
export class WizardModule { }
