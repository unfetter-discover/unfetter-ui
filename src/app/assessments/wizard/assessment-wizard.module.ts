import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepsModule, MenuItem } from 'primeng/primeng';
import { MatButtonModule, MatCardModule, MatDialogModule, MatSnackBarModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule, MatInputModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { CalendarModule } from 'primeng/primeng';
import { PipesModule } from '../../pipes';
import { AssessmentWizardComponent } from './assessment-wizard.component';
import { ComponentModule } from '../../components';
import { AssessmentsService } from '../assessments.service';
import { GlobalModule } from '../../global/global.module';

const routes = [
  { path: '', component: AssessmentWizardComponent }
];

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    AssessmentWizardComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    ComponentModule,
    CalendarModule,
    ChartsModule,
    StepsModule,

    PipesModule,
    MatNativeDateModule,
    GlobalModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AssessmentWizardComponent,
  ],

  providers: [
    AssessmentsService
  ]
})
export class AssessmentWizardModule { }
