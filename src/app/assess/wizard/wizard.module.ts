import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardComponent } from './wizard.component';

import { routing } from './wizard.routing';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ComponentModule } from '../../components/component.module';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { ChartsModule } from 'ng2-charts';
// import { StepsModule } from 'primeng/components/steps/steps';
import { PipesModule } from '../../pipes/pipes.module';
import { GlobalModule } from '../../global/global.module';

const moduleComponents = [
  WizardComponent,
];

const matModules = [
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSelectModule,
  MatInputModule,
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
  ],
  exports: [
    ...moduleComponents,
  ],
})
export class WizardModule { }
