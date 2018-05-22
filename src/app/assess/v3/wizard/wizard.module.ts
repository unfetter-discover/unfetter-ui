import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartsModule } from 'ng2-charts';
import { ComponentModule } from '../../../components/component.module';
import { GlobalModule } from '../../../global/global.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { WizardComponent } from './wizard.component';
import { routing } from './wizard.routing';

const moduleComponents = [
  WizardComponent,
];

const matModules = [
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSnackBarModule,
];

const primengModules = [
];

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
